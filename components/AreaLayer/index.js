import React from 'react'
import Area from '../../components/Area'
import AreaCursor from '../../components/AreaCursor'
import { toPath, toCoordinate, toArea, toRemoval, mergeArea, removeArea } from '../../utilities/map'

const AreaLayer = (props) => {
  let areas = [...props.areas]
  if (props.tool === 'add' && props.startCoord) { // means we are dragging an area
    const cursorCoordinate = toCoordinate(props.board, props.cursor)
    const draggedArea = toArea(props.startCoord, cursorCoordinate)
    areas = mergeArea(areas, draggedArea)
  }
  if (props.tool === 'remove' && props.startCoord) { // means we are dragging an area
    const cursorCoordinate = toCoordinate(props.board, props.cursor, 2)
    const draggedArea = toRemoval(props.startCoord, cursorCoordinate)
    areas = removeArea(areas, draggedArea)
  }
  return (
    <g>
      {areas.map((area, i) => (
        <Area
          key={i}
          path={toPath(props.board, area)}
        />
      ))}
      <AreaCursor
        adding={props.tool === 'add'}
        removing={props.tool === 'remove'}
        board={props.board}
        cursor={props.cursor}
      />
    </g>
  )
}
AreaLayer.propTypes = {
  tool: React.PropTypes.string,
  areas: React.PropTypes.array,
  board: React.PropTypes.object,
  cursor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
  startCoord: React.PropTypes.object,
}

export default AreaLayer
