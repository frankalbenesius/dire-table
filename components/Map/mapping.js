const toPxCoordinate = (center, unit) => gridCoordinate => (
  gridCoordinate.map((position, i) => {
    const modifier = i === 1 ? -1 : 1 // -1 on y, 1 on x
    return center + (modifier * (position * unit))
  })
)

const toPxCoordinateSequence = (center, unit) => gridCoordinates => (
  gridCoordinates.map(toPxCoordinate(center, unit))
)

const toSinglePath = (pxCoordinateSequence) => {
  const str = pxCoordinateSequence.reduce((acc, point, i) => {
    const command = i === 0 ? 'M' : 'L'
    return `${acc}${command} ${point[0]},${point[1]} `
  }, '')
  return `${str} Z `
}

// an "area" is a combination of paths
export const toPath = (center, unit) => gridCoordinateSequences => (
  gridCoordinateSequences
    .map(toPxCoordinateSequence(center, unit))
    .map(toSinglePath)
    .join('')
)

export default toPath
