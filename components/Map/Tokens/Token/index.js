import React from 'react'
import { style } from 'next/css'
import { colors, sizes, noPx } from '../../../constants'

const styles = {
  icon: style({
    fill: 'red',
  }),
}

const Token = ({ player, icon, circle }) => {
  const iconLink = `static/icon/${icon}.svg`
  const iconRadius = circle.r * 0.7
  return (
    <g>
      <circle
        filter="url(#dropshadow)"
        cx={circle.cx}
        cy={circle.cy}
        r={circle.r - noPx(sizes.tokenPadding)}
        fill={colors.player[player]}
        icon={icon}
      />
      <image
        className={styles.icon}
        x={circle.cx - iconRadius}
        y={circle.cy - iconRadius}
        width={iconRadius * 2}
        xlinkHref={iconLink}
      />
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
