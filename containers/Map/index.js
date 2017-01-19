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
import Token from '../../components/Token'

import { toCoordinate, toPath, toCircle } from './utils'

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
    this.handleBoardClick = this.handleBoardClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleTokenDragStart = this.handleTokenDragStart.bind(this)
    this.handleTokenDragEnd = this.handleTokenDragEnd.bind(this)
    this.tokenSort = this.tokenSort.bind(this)
  }

  tokenSort(a, b) {
    if (a.size !== b.size) {
      return (b.size - a.size)
    }
    if (a.id === this.state.draggingTokenId) return 1
    return 0
  }

  handleMouseMove(e) {
    this.setState({
      cursor: {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      },
    })
    e.stopPropagation()
    e.preventDefault()
  }

  handleBoardClick(e) {
    if (this.props.tool === 'token') {
      const location = toCoordinate(this.props.board, this.state.cursor)
      this.props.actions.addToken(location)
    }
    e.stopPropagation()
    e.preventDefault()
  }

  handleTokenDragStart(tokenId) {
    return (e) => {
      this.setState({
        draggingTokenId: tokenId,
      })
      e.preventDefault()
      e.stopPropagation()
    }
  }

  handleTokenDragEnd(e) {
    if (this.state.draggingTokenId > -1) {
      const movingToken = this.props.tokens.byId[this.state.draggingTokenId].size
      this.props.actions.moveToken(
        this.state.draggingTokenId,
        toCoordinate(this.props.board, this.state.cursor, movingToken),
      )
      this.setState({
        draggingTokenId: -1,
      })
      e.preventDefault()
      e.stopPropagation()
    }
  }

  render() {
    let tokenCursor = null
    if (this.props.tool === 'token') {
      const circle = toCircle(
        this.props.board,
        toCoordinate(this.props.board, this.state.cursor),
      )
      tokenCursor = (
        <Token
          player={0}
          icon="neutral"
          cx={this.state.cursor.x}
          cy={this.state.cursor.y}
          radius={circle.radius}
          stamp
        />
      )
    }
    return (
      <Frame centerPx={this.props.board.centerPx}>
        <Board
          boardPx={this.props.board.boardPx}
          onMouseMove={this.handleMouseMove}
          onClick={this.handleBoardClick}
        >
          {this.props.areas.map((area, i) => (
            <Area
              key={i}
              path={toPath(this.props.board, area)}
            />
          ))}
          <Grid squarePx={this.props.board.squarePx} />
          {this.props.tokens.list.sort(this.tokenSort).map((token, i) => {
            const circle = toCircle(
              this.props.board,
              token.location,
              token.size,
            )
            const draggable = this.props.tool === 'cursor' && (
              this.props.player.id === 0 ||
              this.props.player.id === token.player
            )
            const onMouseDown = draggable ? this.handleTokenDragStart(token.id) : null
            const onMouseUp = draggable ? this.handleTokenDragEnd : null
            const dragging = (token.id === this.state.draggingTokenId)
            const cx = dragging ? this.state.cursor.x : circle.cx
            const cy = dragging ? this.state.cursor.y : circle.cy
            return (
              <Token
                key={i}
                id={token.id}
                player={token.player}
                icon={token.icon}
                cx={cx}
                cy={cy}
                draggable={draggable}
                dragging={dragging}
                radius={circle.radius}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
              />
            )
          })}
          {tokenCursor}
        </Board>
      </Frame>
    )
  }
}
Map.propTypes = {
  actions: React.PropTypes.shape({
    addToken: React.PropTypes.func,
    moveToken: React.PropTypes.func,
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
