import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import { getBoard } from '../../store/reducers/board'
import { getAreas } from '../../store/reducers/areas'
import { getTokens } from '../../store/reducers/tokens'

import Area from '../../components/Area'
import Board from '../../components/Board'
import Frame from '../../components/Frame'
import Grid from '../../components/Grid'
import Token from '../../components/Token'

import { toCoordinate, toPath, toCircle } from './utils'

const mapStateToProps = state => ({
  areas: getAreas(state.areas),
  board: getBoard(state.board),
  tokens: getTokens(state.tokens),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: {
        x: 0,
        y: 0,
      },
    }
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

  handleTokenDragStart(tokenId) {
    return () => {
      this.setState({
        draggingTokenId: tokenId,
      })
    }
  }

  handleTokenDragEnd() {
    this.props.actions.moveToken(
      this.state.draggingTokenId,
      toCoordinate(
        this.props.board,
        [this.state.cursor.x, this.state.cursor.y],
        this.props.tokens.byId[this.state.draggingTokenId].size,
      ),
    )
    this.setState({
      draggingTokenId: null,
    })
  }

  render() {
    return (
      <Frame centerPx={this.props.board.centerPx}>
        <Board boardPx={this.props.board.boardPx} onMouseMove={this.handleMouseMove}>
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
                radius={circle.radius}
                onMouseDown={this.handleTokenDragStart(token.id)}
                onMouseUp={this.handleTokenDragEnd}
              />
            )
          })}
        </Board>
      </Frame>
    )
  }
}
Map.propTypes = {
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  tokens: React.PropTypes.object,
  board: React.PropTypes.shape({
    boardPx: React.PropTypes.number,
    centerPx: React.PropTypes.number,
    squarePx: React.PropTypes.number,
    size: React.PropTypes.number,
  }),
  actions: React.PropTypes.shape({
    moveToken: React.PropTypes.func,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
