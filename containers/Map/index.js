import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import { toCoord, toPath, toCircle } from './mapUtils'

import Area from '../../components/Area'
import Board from '../../components/Board'
import Frame from '../../components/Frame'
import Grid from '../../components/Grid'
import Token from '../../components/Token'

const mapStateToProps = state => ({
  areas: state.areas,
  board: state.board,
  tokens: state.tokens,
  tokensArray: Object.keys(state.tokens).map(id => state.tokens[id]),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      boardPx: (props.board.squarePx * props.board.size) + 1,
      centerPx: ((props.board.squarePx * props.board.size) + 1) / 2,
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
      toCoord(
        this.state.centerPx,
        this.props.board.squarePx,
        [this.state.cursor.x, this.state.cursor.y],
        this.props.tokens[this.state.draggingTokenId].size,
      ),
    )
    this.setState({
      draggingTokenId: null,
    })
  }

  render() {
    return (
      <Frame centerPx={this.state.centerPx}>
        <Board boardPx={this.state.boardPx} onMouseMove={this.handleMouseMove}>
          {this.props.areas.map((area, i) => (
            <Area
              key={i}
              path={toPath(this.state.centerPx, this.props.board.squarePx, area)}
            />
          ))}
          <Grid squarePx={this.props.board.squarePx} />
          {this.props.tokensArray.sort(this.tokenSort).map((token, i) => {
            const circle = toCircle(
              this.state.centerPx,
              this.props.board.squarePx,
              token.location,
              token.size)
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
  tokensArray: React.PropTypes.arrayOf(React.PropTypes.object),
  board: React.PropTypes.shape({
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
