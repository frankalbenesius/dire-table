import React from 'react'
import { colors, sizes } from '../../../constants'

const Area = ({ path }) => (
  <path
    fillRule="evenodd"
    d={path}
    fill={colors.foreground}
    stroke={colors.background}
    strokeWidth={sizes.areaStroke}
  />
)

Area.propTypes = {
  path: React.PropTypes.string,
}

export default Area
