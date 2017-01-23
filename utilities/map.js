import Shape from 'clipper-js' // clipping library

/*
  GLOSSARY (cause this crap is confusing)
  Coordinate = the state representation of position on the game board
    - a "CoordinateList" is basically one shape of an area,
      but an area can have multiple "shapes" since it could have holes
    - a coordinate is an array of [x, y] positions (starting from origin at [0, 0])
  Position = the actual pixel position on an SVG
    - a position starts from normal svg origin 0,0 at top left corner of SVG
  Path = SVG string representaiton of a path with potential holes (multiple combined shapes)
*/

const scale = 1000 // scalling allows adjacent areas to avoid merging
const tinyHoleThreshold = 0.002
const removeTinyHoles = (shapes) => {
  shapes.forEach((shape) => {
    if (shape.paths.length > 1) {
      const shapeAreas = shape.areas()
      // eslint-disable-next-line no-param-reassign
      shape.paths = shape.paths.filter((s, i) => Math.abs(shapeAreas[i]) > tinyHoleThreshold)
    }
  })
  return shapes
}
export const mergeArea = (areas, newArea) => {
  const existingShapes = areas.map(area => new Shape(area, true, true).scaleUp(scale))
  const existingShape = existingShapes.reduce((acc, shape) => acc.join(shape), new Shape())
  const newAreaShape = new Shape([newArea], true, true).scaleUp(scale)
  const mergedShapes = existingShape.union(newAreaShape).scaleDown(scale).seperateShapes()
  const result = removeTinyHoles(mergedShapes).map(shape => (shape.mapToLower()))
  return result
}

const easement = 1 / scale // the amount of area put between areas
export const toArea = (coordA, coordB = coordA) => {
  const left = Math.min(coordA.x, coordB.x) - (0.5 - easement)
  const bottom = Math.min(coordA.y, coordB.y) - (0.5 - easement)
  const right = Math.max(coordA.x, coordB.x) + (0.5 - easement)
  const top = Math.max(coordA.y, coordB.y) + (0.5 - easement)
  return [
    { x: left, y: bottom },
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
  ]
}

const roundToHalvesOnly = n => Math.round(n - 0.5) + 0.5
const roundToWhole = n => Math.round(n)
export const toCoordinate = (board, position, tokenSize = 1) => {
  const sizeIsOdd = tokenSize % 2 === 1
  const round = sizeIsOdd ? roundToHalvesOnly : roundToWhole
  return {
    x: round(((position.x - board.centerPx) / board.squarePx)),
    y: round(((position.y - board.centerPx) / board.squarePx) * -1),
  }
}

export const toPosition = board => coordinate => ({
  x: board.centerPx + (coordinate.x * board.squarePx),
  y: board.centerPx + (coordinate.y * board.squarePx * -1),
})

const toPositionList = board => coordinateList => coordinateList.map(toPosition(board))
const toSimplePath = (positionList) => {
  const str = positionList.reduce((acc, position, i) => {
    const command = i === 0 ? 'M' : 'L'
    return `${acc}${command} ${position.x},${position.y} `
  }, '')
  return `${str} Z `
}
// export const toPath = (board, coordinateList) =>
//   toSimplePath(toPositionList(board)(coordinateList))
export const toPath = (board, coordinateLists) =>
  coordinateLists.map(toPositionList(board)).map(toSimplePath).join('')

export const toCircle = (board, coordinate, tokenSize = 1) => {
  const position = toPosition(board)(coordinate)
  return {
    cx: position.x,
    cy: position.y,
    radius: (tokenSize / 2) * board.squarePx,
  }
}
