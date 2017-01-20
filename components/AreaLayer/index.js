import React from 'react'
import Area from '../../components/Area'
import { toPath, toCoordinate, toArea } from '../../utilities/map'

// const handleDragStop(e) {
//   e.preventDefault()
//   e.stopPropagation()
//   if (props.active) {
//     props.onDrag(this.state.dragCoord, toCoordinate(props.board, props.cursor))
//   }
// }

const TokenLayer = (props) => {
  let areas = [...props.areas]
  if (props.adding && props.startCoord) { // means we are dragging an area
    const cursorCoordinate = toCoordinate(props.board, props.cursor)
    const draggedArea = toArea(props.startCoord, cursorCoordinate)
    areas = [...areas, draggedArea]
  }
  return (
    <g>
      {areas.map((area, i) => (
        <Area
          key={i}
          path={toPath(props.board, area)}
        />
      ))}
    </g>
  )
}
TokenLayer.propTypes = {
  adding: React.PropTypes.bool,
  areas: React.PropTypes.array,
  board: React.PropTypes.object,
  cursor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
  // onDrag: React.PropTypes.func,
  startCoord: React.PropTypes.array,
  // removing: React.PropTypes.bool,
}

export default TokenLayer
