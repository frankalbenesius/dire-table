import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../database';

import { setAreas, setTokens } from '../../store/actions';
import { getBoard } from '../../store/reducers/board';
import { getAreas } from '../../store/reducers/areas';
import { getPlayer } from '../../store/reducers/players';
import { getTokens } from '../../store/reducers/tokens';
import { getCurrentToolId, getNewTokenPlayerId } from '../../store/reducers/tool';

import AreaLayer from '../../components/AreaLayer';
import Board from '../../components/Board';
import Frame from '../../components/Frame';
import Grid from '../../components/Grid';
import TokenLayer from '../../components/TokenLayer';

import { mergeArea, removeArea, toArea, toRemoval } from '../../util/areas';
import { toCoordinate } from '../../util/board';

const mapStateToProps = state => ({
  areas: getAreas(state.areas),
  board: getBoard(state.board),
  player: getPlayer(state.players),
  tokens: getTokens(state.tokens),
  tool: getCurrentToolId(state.tool),
  newTokenPlayerId: getNewTokenPlayerId(state.tool),
});

const mapDispatchToProps = dispatch => ({
  addToken: (player, location) => {
    const newToken = {
      player,
      location,
      icon: 'smile',
      size: 1,
      lastUpdated: Date.now(),
    };
    database.ref('/tokens').push(newToken);
  },
  removeToken: (id) => {
    database.ref(`/tokens/${id}`).remove();
  },
  moveToken: (id, location) => {
    database.ref(`/tokens/${id}`).update({
      location,
      lastUpdated: Date.now(),
    });
  },
  setAreas: areas => dispatch(setAreas(areas)),
  setTokens: tokens => dispatch(setTokens(tokens)),
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: {
        x: -100,
        y: -100,
      },
      startCoord: null,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTokenDrag = this.handleTokenDrag.bind(this);
    this.handleTokenShiftClick = this.handleTokenShiftClick.bind(this);
  }

  componentDidMount() {
    database.ref('/areas').on('value', (snap) => {
      this.props.setAreas(snap.val() || []);
    });
    database.ref('/tokens').on('value', (snap) => {
      // TODO: Remove this janky way of adding IDs as obj properties
      const tokens = snap.val();
      let tokensObj = {};
      if (tokens) {
        const tokenIds = Object.keys(tokens);
        tokensObj = tokenIds.reduce(
          (acc, id) => ({
            ...acc,
            [id]: {
              id,
              ...tokens[id],
            },
          }),
          tokensObj,
        );
      }
      this.props.setTokens(tokensObj);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tool !== this.props.tool) {
      this.setState({
        cursor: { x: -100, y: -100 },
        startCoord: null,
      }); // moves cursor away from toolbar
    }
  }

  handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      cursor: {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      },
    });
  }

  handleMouseDown(e) {
    if (e.nativeEvent.which === 1) {
      e.preventDefault();
      e.stopPropagation();
      switch (this.props.tool) {
        case 'token': {
          const clickedCoordinate = toCoordinate(this.props.board, this.state.cursor);
          this.props.addToken(this.props.newTokenPlayerId, clickedCoordinate);
          break;
        }
        case 'add': {
          const clickedCoordinate = toCoordinate(this.props.board, this.state.cursor);
          this.setState({ startCoord: clickedCoordinate });
          break;
        }
        case 'remove': {
          const clickedCoordinate = toCoordinate(this.props.board, this.state.cursor, 2);
          this.setState({ startCoord: clickedCoordinate });
          break;
        }
        default:
          break;
      }
    }
  }

  handleMouseUp(e) {
    if (e.nativeEvent.which === 1) {
      e.preventDefault();
      e.stopPropagation();
      switch (this.props.tool) {
        case 'add': {
          const stopCoord = toCoordinate(this.props.board, this.state.cursor);
          const resultingAreas = mergeArea(
            this.props.areas,
            toArea(this.state.startCoord, stopCoord),
          );
          database.ref('/areas').set(resultingAreas);
          this.setState({ startCoord: null });
          break;
        }
        case 'remove': {
          const stopCoord = toCoordinate(this.props.board, this.state.cursor, 2);
          const resultingAreas = removeArea(
            this.props.areas,
            toRemoval(this.state.startCoord, stopCoord),
          );
          database.ref('/areas').set(resultingAreas);
          this.setState({ startCoord: null });
          break;
        }
        default:
          break;
      }
    }
  }

  handleTokenShiftClick(tokenId) {
    this.props.removeToken(tokenId);
  }
  handleTokenDrag(tokenId) {
    this.props.moveToken(
      tokenId,
      toCoordinate(this.props.board, this.state.cursor, this.props.tokens.byId[tokenId].size),
    );
  }

  render() {
    return (
      <Frame centerPx={this.props.board.centerPx}>
        <Board
          boardPx={this.props.board.boardPx}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          <AreaLayer
            tool={this.props.tool}
            areas={this.props.areas}
            board={this.props.board}
            cursor={this.state.cursor}
            startCoord={this.state.startCoord}
          />
          <Grid squarePx={this.props.board.squarePx} />
          <TokenLayer
            tool={this.props.tool}
            board={this.props.board}
            cursor={this.state.cursor}
            onDrag={this.handleTokenDrag}
            onShiftClick={this.handleTokenShiftClick}
            player={this.props.player}
            tokens={this.props.tokens.list}
            newTokenPlayerId={this.props.newTokenPlayerId}
          />
        </Board>
      </Frame>
    );
  }
}
Map.propTypes = {
  addToken: PropTypes.func,
  moveToken: PropTypes.func,
  removeToken: PropTypes.func,
  setAreas: PropTypes.func,
  setTokens: PropTypes.func,
  areas: PropTypes.arrayOf(PropTypes.array),
  board: PropTypes.shape({
    boardPx: PropTypes.number,
    centerPx: PropTypes.number,
    size: PropTypes.number,
    squarePx: PropTypes.number,
  }),
  player: PropTypes.shape({
    id: PropTypes.number,
  }),
  tokens: PropTypes.object,
  newTokenPlayerId: PropTypes.number,
  tool: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
