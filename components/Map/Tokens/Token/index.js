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

const Token = ({ player, icon, circle }) => {
  const iconRadius = circle.r * 0.7
  return (
    <g className={styles.token}>
      <circle
        filter="url(#dropshadow)"
        cx={circle.cx}
        cy={circle.cy}
        r={circle.r - noPx(sizes.tokenPadding)}
        fill={colors.player[player]}
      />
      <svg
        className={styles.icon}
        x={circle.cx - iconRadius}
        y={circle.cy - iconRadius}
        width={iconRadius * 2}
        height={iconRadius * 2}
      >
        <Icon icon={icon} />
      </svg>
    </g>
  )
}

Token.propTypes = {
  player: React.PropTypes.number,
  icon: React.PropTypes.string,
  circle: React.PropTypes.shape({
    cx: React.PropTypes.number,
    cy: React.PropTypes.number,
    r: React.PropTypes.number,
  }),
}

export default Token
