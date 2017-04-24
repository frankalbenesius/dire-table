import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../store/actions';
import { getBoard } from '../../store/reducers/board';
import { getAreas } from '../../store/reducers/areas';
import { getPlayer } from '../../store/reducers/player';
import { getTokens } from '../../store/reducers/tokens';
import { getTool } from '../../store/reducers/tool';

import AreaLayer from '../../components/AreaLayer';
import Board from '../../components/Board';
import Frame from '../../components/Frame';
import Grid from '../../components/Grid';
import TokenLayer from '../../components/TokenLayer';

import { toCoordinate, toArea, toRemoval } from '../../utilities/map';

const mapStateToProps = state => ({
  areas: getAreas(state.areas),
  board: getBoard(state.board),
  player: getPlayer(state.player),
  tokens: getTokens(state.tokens),
  tool: getTool(state.tool),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
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
          this.props.actions.addToken(clickedCoordinate);
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
          this.props.actions.addArea(toArea(this.state.startCoord, stopCoord));
          this.setState({ startCoord: null });
          break;
        }
        case 'remove': {
          const stopCoord = toCoordinate(this.props.board, this.state.cursor, 2);
          this.props.actions.removeArea(toRemoval(this.state.startCoord, stopCoord));
          this.setState({ startCoord: null });
          break;
        }
        default:
          break;
      }
    }
  }

  handleTokenShiftClick(tokenId) {
    this.props.actions.removeToken(tokenId);
  }
  handleTokenDrag(tokenId) {
    this.props.actions.moveToken(
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
            playerId={this.props.player.id}
            tokens={this.props.tokens.list}
          />
        </Board>
      </Frame>
    );
  }
}
Map.propTypes = {
  actions: PropTypes.shape({
    addArea: PropTypes.func,
    addToken: PropTypes.func,
    moveToken: PropTypes.func,
    removeArea: PropTypes.func,
    removeToken: PropTypes.func,
  }),
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
  tool: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
