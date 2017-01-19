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

export const toPosition = board => coordinate => (
  coordinate.map((coordinatePart, i) => {
    const modifier = i === 1 ? -1 : 1 // -1 on y, 1 on x
    return board.centerPx + (modifier * (coordinatePart * board.squarePx))
  })
)

const roundToHalvesOnly = n => Math.round(n - 0.5) + 0.5
const roundToWhole = n => Math.round(n)
export const toCoordinate = (board, position, tokenSize = 1) => {
  const sizeIsOdd = tokenSize % 2 === 1
  const round = sizeIsOdd ? roundToHalvesOnly : roundToWhole
  return [position.x, position.y].map((positionPart, i) => {
    const modifier = i === 1 ? -1 : 1 // -1 on y, 1 on x
    const pxFromCenter = positionPart - board.centerPx
    const unitsFromCenter = (pxFromCenter / board.squarePx) * modifier
    return round(unitsFromCenter)
  })
}

const toPositionList = board => coordinateList => coordinateList.map(toPosition(board))
const toSimplePath = (positionList) => {
  const str = positionList.reduce((acc, position, i) => {
    const command = i === 0 ? 'M' : 'L'
    return `${acc}${command} ${position[0]},${position[1]} `
  }, '')
  return `${str} Z `
}
export const toPath = (board, coordinateLists) =>
  coordinateLists.map(toPositionList(board)).map(toSimplePath).join('')

export const toCircle = (board, coordinate, tokenSize) => {
  const position = toPosition(board)(coordinate)
  return {
    cx: position[0],
    cy: position[1],
    radius: (tokenSize / 2) * board.squarePx,
  }
}
