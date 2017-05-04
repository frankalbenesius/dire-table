import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connect as fbConnect } from 'react-firebase';

import { getBoard } from '../../store/reducers/board';
import { getCurrentToolId, getNewTokenPlayerId } from '../../store/reducers/tool';

import AreaLayer from '../../components/AreaLayer';
import Board from '../../components/Board';
import Frame from '../../components/Frame';
import Grid from '../../components/Grid';
import TokenLayer from '../../components/TokenLayer';

import { mergeArea, removeArea, toArea, toRemoval } from '../../util/areas';
import { toCoordinate } from '../../util/board';

const toArray = (obj) => {
  if (!obj) return [];
  return Object.keys(obj).map(k => obj[k]);
};

const mapStateToProps = state => ({
  board: getBoard(state.board),
  tool: getCurrentToolId(state.tool),
  newTokenPlayerId: getNewTokenPlayerId(state.tool),
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
          const newArea = toArea(this.state.startCoord, stopCoord);
          const resultingAreas = mergeArea(toArray(this.props.areas), newArea);
          this.setState(
            {
              startCoord: null,
            },
            () => {
              this.props.setAreas(resultingAreas);
            },
          );
          break;
        }
        case 'remove': {
          const stopCoord = toCoordinate(this.props.board, this.state.cursor, 2);
          const removingArea = toRemoval(this.state.startCoord, stopCoord);
          const resultingAreas = removeArea(toArray(this.props.areas), removingArea);
          this.setState(
            {
              startCoord: null,
            },
            () => {
              this.props.setAreas(resultingAreas);
            },
          );
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
      toCoordinate(this.props.board, this.state.cursor, this.props.tokens[tokenId].size),
    );
  }

  render() {
    const tokens = this.props.tokens || {};
    const players = this.props.players || {};
    const tokensList = Object.keys(tokens).map(key => Object.assign({}, tokens[key], { id: key }));
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
            areas={toArray(this.props.areas)}
            board={this.props.board}
            cursor={this.state.cursor}
            startCoord={this.state.startCoord}
          />
          <Grid squarePx={this.props.board.squarePx} />
          {players && tokens
            ? <TokenLayer
              tool={this.props.tool}
              board={this.props.board}
              cursor={this.state.cursor}
              onDrag={this.handleTokenDrag}
              onShiftClick={this.handleTokenShiftClick}
              players={players}
              player={players[this.props.player]}
              tokens={tokensList}
              newTokenPlayer={players[this.props.newTokenPlayerId]}
            />
            : null}
        </Board>
      </Frame>
    );
  }
}
Map.propTypes = {
  areas: PropTypes.array, // firebase prop ... why array?
  tokens: PropTypes.object, // firebase prop
  players: PropTypes.object, // firebase prop
  addToken: PropTypes.func, // firebase function
  moveToken: PropTypes.func, // firebase function
  removeToken: PropTypes.func, // firebase function
  setAreas: PropTypes.func, // firebase function
  board: PropTypes.shape({
    boardPx: PropTypes.number,
    centerPx: PropTypes.number,
    size: PropTypes.number,
    squarePx: PropTypes.number,
  }),
  player: PropTypes.string,
  newTokenPlayerId: PropTypes.string,
  tool: PropTypes.string,
  // table: PropTypes.string, // just for firebase connect
};

const mapFirebaseToProps = ({ table }, ref) => ({
  areas: `tables/${table}/areas`,
  tokens: `tables/${table}/tokens`,
  players: `tables/${table}/players`,
  setAreas: (areas) => {
    ref(`tables/${table}/areas`).set(areas);
  },
  setTokens: (tokens) => {
    ref(`tables/${table}/tokens`).set(tokens);
  },
  addToken: (player, location) => {
    const newToken = {
      player,
      location,
      icon: 'smile',
      size: 1,
      lastUpdated: Date.now(),
    };
    ref(`tables/${table}/tokens`).push(newToken);
  },
  removeToken: (id) => {
    ref(`tables/${table}/tokens/${id}`).remove();
  },
  moveToken: (id, location) => {
    ref(`tables/${table}/tokens/${id}`).update({
      location,
      lastUpdated: Date.now(),
    });
  },
});

export default connect(mapStateToProps)(fbConnect(mapFirebaseToProps)(Map));
