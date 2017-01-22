import React from 'react'
import Area from '../../components/Area'
import { toPath, toCoordinate, toArea, mergeArea } from '../../utilities/map'

// const handleDragStop(e) {
//   e.preventDefault()
//   e.stopPropagation()
//   if (props.active) {
//     props.onDrag(this.state.dragCoord, toCoordinate(props.board, props.cursor))
//   }
// }

const AreaLayer = (props) => {
  let areas = [...props.areas]
  if (props.adding && props.startCoord) { // means we are dragging an area
    const cursorCoordinate = toCoordinate(props.board, props.cursor)
    const draggedArea = toArea(props.startCoord, cursorCoordinate)
    areas = mergeArea(areas, draggedArea)
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
AreaLayer.propTypes = {
  adding: React.PropTypes.bool,
  areas: React.PropTypes.array,
  board: React.PropTypes.object,
  cursor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
  // onDrag: React.PropTypes.func,
  startCoord: React.PropTypes.object,
  // removing: React.PropTypes.bool,
}

export default AreaLayer
