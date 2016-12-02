import React from 'react'
import { colors } from '../../../constants'

const Area = ({ path }) => (
  <path
    fillRule="evenodd"
    d={path}
    fill={colors.foreground}
    stroke={colors.background}
    strokeLinecap="square"
    strokeWidth="9"
  />
)

Area.propTypes = {
  path: React.PropTypes.string,
}

export default Area
