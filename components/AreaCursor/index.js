import React from 'react'
import { toPath, toArea, toCoordinate } from '../../utilities/map'
import { colors, sizes, opacity } from '../constants'

const AreaCursor = ({ active, cursor, board }) => {
  if (active) {
    const cursorCoordinate = toCoordinate(board, cursor)
    const area = toArea(cursorCoordinate)
    const path = toPath(board, area)
    return (
      <path
        d={path}
        fill={colors.selection}
        stroke={colors.background}
        strokeWidth={sizes.areaStroke}
        strokeOpacity={0}
        opacity={opacity}
      />
    )
  }
  return null
}
AreaCursor.propTypes = {
  active: React.PropTypes.bool,
  board: React.PropTypes.object,
  cursor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
}

export default AreaCursor
