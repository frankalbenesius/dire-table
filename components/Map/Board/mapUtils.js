export const toPxCoord = (center, unit) => gridCoord => (
  gridCoord.map((position, i) => {
    const modifier = i === 1 ? -1 : 1 // -1 on y, 1 on x
    return center + (modifier * (position * unit))
  })
)

const toPxCoordList = (center, unit) => gridCoords => (
  gridCoords.map(toPxCoord(center, unit))
)

const combinePaths = (pxCoordList) => {
  const str = pxCoordList.reduce((acc, point, i) => {
    const command = i === 0 ? 'M' : 'L'
    return `${acc}${command} ${point[0]},${point[1]} `
  }, '')
  return `${str} Z `
}

export const toPath = (center, unit) => gridCoordLists => (
  gridCoordLists
    .map(toPxCoordList(center, unit))
    .map(combinePaths)
    .join('')
)

export const toCircle = (center, unit) => (coord, size) => {
  const pxCoord = toPxCoord(center, unit)(coord)
  return {
    cx: pxCoord[0],
    cy: pxCoord[1],
    radius: (size / 2) * unit,
  }
}

const createMapUtils = (center, unit) => ({
  toPath: toPath(center, unit),
  toPxCoord: toPxCoord(center, unit),
  toCircle: toCircle(center, unit),
})

export default createMapUtils
