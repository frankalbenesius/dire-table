import React from 'react'
import { colors } from '../../../constants'

// we can move all of these calculations to a utility function
// that Map will important since the only thing Area needs to know
// is the final svg px paths. Other map pieces will also need to know
// how to make these final paths so no sense in putting the logic here.
const Area = ({ path }) => (
  <path
    fillRule="evenodd"
    d={path}
    fill={colors.foreground}
    stroke={colors.background}
    strokeLinecap="square"
    strokeWidth="8"
  />
)

Area.propTypes = {
  path: React.PropTypes.string,
}

export default Area
