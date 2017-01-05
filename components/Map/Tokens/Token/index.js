import React from 'react'
import { style } from 'next/css'
import { colors, sizes, noPx } from '../../../constants'
import Icon from '../../../Icon'

const styles = {
  token: style({
    cursor: 'pointer',
    fill: '#000000',
  }),
}

class Token extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
      pos: {
        cx: props.cx,
        cy: props.cy,
      },
      dragDelta: {
        x: 0,
        y: 0,
      },
    }
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }
  /*
    TODO:
    - move token dragging state to <Board />
    - handleMouseDown should tell <Board /> what is being dragged
    - move onMouseMove && onMouseUp logic to <Board />
    - mouseUp -> dispatches TOKEN_MOVE action to make the move official
    - add "drag css" (cursor && bigger shadow)
    - figure out where to drop new token based on final position => grid coordinated
  */
  handleMouseDown(e) {
    if (e.button !== 0) return // only left mouse button matters here
    const pos = this.node.getBoundingClientRect()
    this.setState({
      dragging: true,
      start: {
        x: pos.left + (pos.width / 2),
        y: pos.top + (pos.width / 2),
      },
    })
    e.stopPropagation()
    e.preventDefault()
  }
  handleMouseMove(e) {
    if (!this.state.dragging) return
    this.setState({
      dragDelta: {
        x: e.clientX - this.state.start.x,
        y: e.clientY - this.state.start.y,
      },
    })
    e.stopPropagation()
    e.preventDefault()
  }
  handleMouseUp(e) {
    this.setState({
      dragging: false,
      dragDelta: {
        x: 0,
        y: 0,
      },
    })
    e.stopPropagation()
    e.preventDefault()
  }
  render() {
    const iconRadius = this.props.radius * 0.7
    const curCx = this.state.pos.cx + this.state.dragDelta.x
    const curCy = this.state.pos.cy + this.state.dragDelta.y
    return (
      <g
        className={styles.token}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref={(c) => { this.node = c }}
      >
        <circle
          draggable="true"
          filter="url(#dropshadow)"
          cx={curCx}
          cy={curCy}
          r={this.props.radius - noPx(sizes.tokenPadding)}
          fill={colors.player[this.props.player]}
        />
        <svg
          className={styles.icon}
          x={curCx - iconRadius}
          y={curCy - iconRadius}
          width={iconRadius * 2}
          height={iconRadius * 2}
        >
          <Icon icon={this.props.icon} />
        </svg>
      </g>
    )
  }
}

Token.propTypes = {
  // id: React.PropTypes.number,
  player: React.PropTypes.number,
  icon: React.PropTypes.string,
  radius: React.PropTypes.number,
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
}
Token.defaultProps = {}

export default Token
