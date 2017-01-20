import React from 'react'
import { style } from 'next/css'
import { colors, sizes, noPx } from '../constants'
import Icon from '../Icon'

const tokenStyles = {
  fill: '#000000',
}
const styles = {
  undraggable: style({
    ...tokenStyles,
    cursor: 'default',
  }),
  draggable: style({
    ...tokenStyles,
    cursor: 'pointer',
  }),
  dragging: style({
    ...tokenStyles,
    cursor: 'grabbing',
  }),
  cursor: style({
    ...tokenStyles,
    cursor: 'none',
    opacity: '0.5',
  }),
}

const Token = (props) => {
  const iconRadius = props.radius * 0.7
  let tokenClass = styles.undraggable
  if (props.draggable) {
    tokenClass = props.dragging ? styles.dragging : styles.draggable
  }
  if (props.replaceCursor) {
    tokenClass = styles.cursor
  }
  return (
    <g
      className={tokenClass}
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
  draggable: React.PropTypes.bool,
  dragging: React.PropTypes.bool,
  replaceCursor: React.PropTypes.bool,
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
}
Token.defaultProps = {}

export default Token
