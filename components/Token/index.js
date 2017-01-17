import React from 'react'
import { style } from 'next/css'
import { colors, sizes, noPx } from '../constants'
import Icon from '../Icon'

const styles = {
  token: style({
    cursor: 'pointer',
    fill: '#000000',
  }),
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
const Token = (props) => {
  const iconRadius = props.radius * 0.7
  return (
    <g
      className={styles.token}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
    >
      <circle
        draggable="true"
        filter="url(#dropshadow)"
        cx={props.cx}
        cy={props.cy}
        r={props.radius - noPx(sizes.tokenPadding)}
        fill={colors.player[props.player]}
      />
      <svg
        className={styles.icon}
        x={props.cx - iconRadius}
        y={props.cy - iconRadius}
        width={iconRadius * 2}
        height={iconRadius * 2}
      >
        <Icon icon={props.icon} />
      </svg>
    </g>
  )
}
Token.propTypes = {
  onMouseUp: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  player: React.PropTypes.number,
  icon: React.PropTypes.string,
  radius: React.PropTypes.number,
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
}
Token.defaultProps = {}

export default Token
