import React from 'react'
import { colors } from '../../../constants'

// we can move all of these calculations to a utility function
// that Map will important since the only thing Area needs to know
// is the final svg px paths. Other map pieces will also need to know
// how to make these final paths so no sense in putting the logic here.
const Area = ({ coords, centerPx, cellSize }) => {
  const toPxCoordinate = (center, unit) => gridCoordinate => (
    gridCoordinate.map((position, i) => {
      const modifier = i === 1 ? -1 : 1 // -1 on y, 1 on x
      return center + (modifier * (position * unit))
    })
  )
  const toPxCoordinateSequence = (center, unit) => gridCoordinates => (
    gridCoordinates.map(toPxCoordinate(center, unit))
  )
  const toPath = (pxCoordinateSequence) => {
    const str = pxCoordinateSequence.reduce((acc, point, i) => {
      const command = i === 0 ? 'M' : 'L'
      return `${acc}${command} ${point[0]},${point[1]} `
    }, '')
    return `${str} Z `
  }
  const toCombinedPath = (gridCoordinateSequences, center, unit) => (
    gridCoordinateSequences
      .map(toPxCoordinateSequence(center, unit))
      .map(toPath)
      .join('')
  )
  const combinedPath = toCombinedPath(coords, centerPx, cellSize)

  return (
    <path
      fillRule="evenodd"
      d={combinedPath}
      fill={colors.foreground}
      stroke={colors.background}
      strokeLinecap="square"
      strokeWidth="8"
    />
  )
}
Area.propTypes = {
  coords: React.PropTypes.arrayOf(React.PropTypes.array),
  centerPx: React.PropTypes.number,
  cellSize: React.PropTypes.number,
}

export default Area
