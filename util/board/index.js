const roundToHalvesOnly = n => Math.round(n - 0.5) + 0.5;
const roundToWhole = n => Math.round(n);

const toCoordinate = (board, position, tokenSize = 1) => {
  const sizeIsOdd = tokenSize % 2 === 1;
  const round = sizeIsOdd ? roundToHalvesOnly : roundToWhole;
  return {
    x: round((position.x - board.centerPx) / board.squarePx),
    y: round(((position.y - board.centerPx) / board.squarePx) * -1)
  };
};

const toPosition = board => coordinate => ({
  x: board.centerPx + coordinate.x * board.squarePx,
  y: board.centerPx + coordinate.y * board.squarePx * -1
});

const toPositionList = board => coordinateList =>
  coordinateList.map(toPosition(board));

const toPathSegment = positionList => {
  const str = positionList.reduce((acc, position, i) => {
    const command = i === 0 ? "M" : "L";
    return `${acc}${command} ${position.x},${position.y} `;
  }, "");
  return `${str} Z `;
};

const toPath = (board, coordinateLists) =>
  coordinateLists
    .map(toPositionList(board))
    .map(toPathSegment)
    .join("");

const toCircle = (board, coordinate, tokenSize = 1) => {
  const position = toPosition(board)(coordinate);
  return {
    cx: position.x,
    cy: position.y,
    radius: (tokenSize / 2) * board.squarePx
  };
};

export { toCoordinate, toPosition, toPath, toCircle };
