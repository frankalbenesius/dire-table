// @flow

import { Board, Coordinate, Position, Path, Circle } from '../types';

const roundToHalvesOnly = n => Math.round(n - 0.5) + 0.5;
const roundToWhole = n => Math.round(n);

const toCoordinate = (board: Board, position: Position, tokenSize: number = 1): Coordinate => {
  const sizeIsOdd = tokenSize % 2 === 1;
  const round = sizeIsOdd ? roundToHalvesOnly : roundToWhole;
  return {
    x: round((position.x - board.centerPx) / board.squarePx),
    y: round((position.y - board.centerPx) / board.squarePx * -1),
  };
};

const toPosition = (board: Board) => (coordinate: Coordinate): Position => ({
  x: board.centerPx + coordinate.x * board.squarePx,
  y: board.centerPx + coordinate.y * board.squarePx * -1,
});

const toPositionList = (board: Board) => (coordinateList: Array<Coordinate>): Array<Position> =>
  coordinateList.map(toPosition(board));

const toPathSegment = (positionList: Array<Position>): string => {
  const str = positionList.reduce((acc, position, i) => {
    const command = i === 0 ? 'M' : 'L';
    return `${acc}${command} ${position.x},${position.y} `;
  }, '');
  return `${str} Z `;
};

const toPath = (board: Board, coordinateLists: Array<Array<Coordinate>>): Path =>
  coordinateLists.map(toPositionList(board)).map(toPathSegment).join('');

const toCircle = (board: Board, coordinate: Coordinate, tokenSize: number = 1): Circle => {
  const position = toPosition(board)(coordinate);
  return {
    cx: position.x,
    cy: position.y,
    radius: tokenSize / 2 * board.squarePx,
  };
};

export { toCoordinate, toPosition, toPath, toCircle };
