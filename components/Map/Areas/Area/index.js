import React from 'react'

// we can move all of these calculations to a utility function
// that Map will important since the only thing Area needs to know
// is the final svg px paths. Other map pieces will also need to know
// how to make these final paths so no sense in putting the logic here.
const Area = ({ coords, centerPx, cellSize }) => {
  const coordsToPx = (points, center, unitSize) =>
    points.map(coord =>
      coord.map((distance, i) => {
        const modifier = i === 1 ? -1 : 1
        return center + (modifier * (distance * unitSize))
      }))
  const outlinePxCoords = coordsToPx(coords[0], centerPx, cellSize)

  const outlinePoints = points => (
    points.reduce((acc, point) => `${acc}${point[0]},${point[1]} `, '')
  )
  return (
    <polygon
      points={outlinePoints(outlinePxCoords)}
      fill="PaleVioletRed"
    />
  )
}
Area.propTypes = {
  coords: React.PropTypes.arrayOf(React.PropTypes.array),
  centerPx: React.PropTypes.number,
  cellSize: React.PropTypes.number,
}

export default Area
