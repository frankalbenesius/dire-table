import React from 'react'
import { colors, sizes, noPx } from '../../../constants'

const Token = ({ player, icon, circle }) => (
  <circle
    filter="url(#dropshadow)"
    cx={circle.cx}
    cy={circle.cy}
    r={circle.r - noPx(sizes.tokenPadding)}
    fill={colors.player[player]}
    icon={icon}
  />
)

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
