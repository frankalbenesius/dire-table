import React from 'react'
import { toPath, toArea, toCoordinate, toPosition } from '../../utilities/map'
import { colors, sizes, opacity } from '../constants'

const AreaCursor = ({ adding, removing, cursor, board }) => {
  if (adding) {
    const cursorCoordinate = toCoordinate(board, cursor)
    const area = toArea(cursorCoordinate)
    const path = toPath(board, area)
    return (
      <path
        d={path}
        fill={colors.selection}
        opacity={opacity}
      />
    )
  }
  if (removing) {
    const pos = toPosition(board)(toCoordinate(board, cursor, 2))
    return (
      <circle
        cx={pos.x}
        cy={pos.y}
        r={sizes.tokenPadding}
        fill={colors.selection}
        opacity={opacity}
      />
    )
  }
  return null
}
AreaCursor.propTypes = {
  adding: React.PropTypes.bool,
  removing: React.PropTypes.bool,
  board: React.PropTypes.object,
  cursor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
}

export default AreaCursor
