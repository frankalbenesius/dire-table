import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import createMapUtils from './mapUtils'

import Area from '../../components/Area'
import Board from '../../components/Board'
import Frame from '../../components/Frame'
import Grid from '../../components/Grid'
import Token from '../../components/Token'

const mapStateToProps = state => ({
  areas: state.areas,
  board: state.board,
  tokens: Object.keys(state.tokens).map(id => state.tokens[id]),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const sortBySize = (a, b) => b.size - a.size

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
    this.setState({
      draggingTokenId: null,
    })
  }

  render() {
    const boardPx = (this.props.board.squarePx * this.props.board.size) + 1
    const centerPx = boardPx / 2
    const mapUtils = createMapUtils(centerPx, this.props.board.squarePx)
    return (
      <Frame centerPx={centerPx}>
        <Board boardPx={boardPx} onMouseMove={this.handleMouseMove}>
          {this.props.areas.map((area, i) => (
            <Area
              key={i}
              path={mapUtils.toPath(area)}
            />
          ))}
          <Grid squarePx={this.props.board.squarePx} />
          {this.props.tokens.sort(sortBySize).map((token, i) => {
            const circle = mapUtils.toCircle(token.location, token.size)
            let cx = circle.cx
            let cy = circle.cy
            if (token.id === this.state.draggingTokenId) {
              cx = this.state.cursor.x
              cy = this.state.cursor.y
            }
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
  tokens: React.PropTypes.arrayOf(React.PropTypes.object),
  board: React.PropTypes.shape({
    squarePx: React.PropTypes.number,
    size: React.PropTypes.number,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
