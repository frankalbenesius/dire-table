import React from 'react'
import Token from '../../components/Token'
import { toCircle, toCoordinate } from '../../utilities/map'

const TokenCursor = ({ active, cursor, board }) => {
  if (active) {
    const { radius, cx, cy } = toCircle(board, toCoordinate(board, cursor))
    return (
      <Token
        player={0}
        icon="neutral"
        cx={cx}
        cy={cy}
        radius={radius}
        cursor
      />
    )
  }
  return null
}
TokenCursor.propTypes = {
  active: React.PropTypes.bool,
  board: React.PropTypes.object,
  cursor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
}

export default TokenCursor
