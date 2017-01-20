import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from '../../store/actions'
import { getBoard } from '../../store/reducers/board'
import { getAreas } from '../../store/reducers/areas'
import { getPlayer } from '../../store/reducers/player'
import { getTokens } from '../../store/reducers/tokens'
import { getTool } from '../../store/reducers/tool'

import Area from '../../components/Area'
import Board from '../../components/Board'
import Frame from '../../components/Frame'
import Grid from '../../components/Grid'
import TokenLayer from '../../components/TokenLayer'
import TokenCursor from '../../components/TokenCursor'

import { toCoordinate, toPath, toArea } from '../../utilities/map'

const mapStateToProps = state => ({
  areas: getAreas(state.areas),
  board: getBoard(state.board),
  player: getPlayer(state.player),
  tokens: getTokens(state.tokens),
  tool: getTool(state.tool),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: {
        x: -100,
        y: -100,
      },
      draggingTokenId: -1,
    }
    this.handleBoardMouseDown = this.handleBoardMouseDown.bind(this)
    this.handleBoardMouseUp = this.handleBoardMouseUp.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleTokenDrag = this.handleTokenDrag.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tool !== this.props.tool) {
      this.setState({ cursor: { x: -100, y: -100 } }) // moves cursor away from toolbar
    }
  }

  handleMouseMove(e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      cursor: {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      },
    })
  }

  handleBoardMouseDown(e) {
    e.preventDefault()
    e.stopPropagation()
    const location = toCoordinate(this.props.board, this.state.cursor)
    switch (this.props.tool) {
      case 'token': {
        this.props.actions.addToken(location)
        break
      }
      default: break
    }
  }

  handleTokenDrag(tokenId) {
    this.props.actions.moveToken(
      tokenId,
      toCoordinate(this.props.board, this.state.cursor, this.props.tokens.byId[tokenId].size),
    )
  }

  handleBoardMouseUp(e) {
    e.preventDefault()
    e.stopPropagation()
    switch (this.props.tool) {
      case 'add':
        this.props.actions.addArea(
          toArea(toCoordinate(this.props.board, this.state.cursor)),
        )
        break
      default: break
    }
  }

  render() {
    return (
      <Frame centerPx={this.props.board.centerPx}>
        <Board
          boardPx={this.props.board.boardPx}
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleBoardMouseDown}
          onMouseUp={this.handleBoardMouseUp}
        >
          {this.props.areas.map((area, i) => (
            <Area
              key={i}
              path={toPath(this.props.board, area)}
            />
          ))}
          <Grid squarePx={this.props.board.squarePx} />
          <TokenLayer
            active={this.props.tool === 'cursor'}
            board={this.props.board}
            cursor={this.state.cursor}
            onDrag={this.handleTokenDrag}
            playerId={this.props.player.id}
            tokens={this.props.tokens.list}
          />
          <TokenCursor
            active={this.props.tool === 'token'}
            board={this.props.board}
            cursor={this.state.cursor}
          />
        </Board>
      </Frame>
    )
  }
}
Map.propTypes = {
  actions: React.PropTypes.shape({
    moveToken: React.PropTypes.func,
    addToken: React.PropTypes.func,
    addArea: React.PropTypes.func,
  }),
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  board: React.PropTypes.shape({
    boardPx: React.PropTypes.number,
    centerPx: React.PropTypes.number,
    squarePx: React.PropTypes.number,
    size: React.PropTypes.number,
  }),
  player: React.PropTypes.shape({
    id: React.PropTypes.number,
  }),
  tokens: React.PropTypes.object,
  tool: React.PropTypes.string,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
