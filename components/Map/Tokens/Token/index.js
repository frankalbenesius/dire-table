import React from 'react'
import { sizes, noPx } from '../../../constants'

const Token = ({ color, icon, circle }) => (
  <circle
    filter="url(#dropshadow)"
    cx={circle.cx}
    cy={circle.cy}
    r={circle.r - noPx(sizes.tokenPadding)}
    fill={color}
    icon={icon}
  />
)

Token.propTypes = {
  color: React.PropTypes.string,
  icon: React.PropTypes.string,
  circle: React.PropTypes.shape({
    cx: React.PropTypes.number,
    cy: React.PropTypes.number,
    r: React.PropTypes.number,
  }),
}

export default Token
