export const toPxCoord = (center, unit, gridCoord) => (
  gridCoord.map((position, i) => {
    const modifier = i === 1 ? -1 : 1 // -1 on y, 1 on x
    return center + (modifier * (position * unit))
  })
)

const roundToHalvesOnly = n => Math.round(n - 0.5) + 0.5
const roundToWhole = n => Math.round(n)
export const toCoord = (center, unit, pxLocation, tokenSize) => {
  const sizeIsOdd = tokenSize % 2 === 1
  const round = sizeIsOdd ? roundToHalvesOnly : roundToWhole
  return pxLocation.map((px, i) => {
    const modifier = i === 1 ? -1 : 1 // -1 on y, 1 on x
    const pxFromCenter = px - center
    const unitsFromCenter = (pxFromCenter / unit) * modifier
    return round(unitsFromCenter)
  })
}

const toPxCoordList = (center, unit) => gridCoords => (
  gridCoords.map(gridCoord => toPxCoord(center, unit, gridCoord))
)
const combinePaths = (pxCoordList) => {
  const str = pxCoordList.reduce((acc, point, i) => {
    const command = i === 0 ? 'M' : 'L'
    return `${acc}${command} ${point[0]},${point[1]} `
  }, '')
  return `${str} Z `
}
export const toPath = (center, unit, gridCoordLists) => (
  gridCoordLists
    .map(toPxCoordList(center, unit))
    .map(combinePaths)
    .join('')
)

export const toCircle = (center, unit, coord, size) => {
  const pxCoord = toPxCoord(center, unit, coord)
  return {
    cx: pxCoord[0],
    cy: pxCoord[1],
    radius: (size / 2) * unit,
  }
}
