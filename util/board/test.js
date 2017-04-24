import test from 'tape';
import { toCoordinate } from './index';

test('toCoordinate', (t) => {
  const board = {
    centerPx: 50,
    squarePx: 10,
  };
  const position = {
    x: 12,
    y: 15,
  };
  const expected = {
    x: -3,
    y: 3,
  };
  const actual = toCoordinate(board, position);
  t.deepEqual(expected, actual);
});
