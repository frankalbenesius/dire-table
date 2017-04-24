// the unit position relative to the board origin at (0, 0)
type Coordinate = {
  x: number,
  y: number,
};

// one of the shapes that make up an area (a visible shape while hole shapes)
type Polygon = Array<Coordinate>;

// a visible shape that may have hole shapes
type Area = Array<Polygon>;

// the context values needed to translate Coordinates and Positions
type Board = {
  squarePx: number,
  centerPx: number,
};
// the pixel position relative to the boards top left corner
type Position = {
  x: number,
  y: number,
};

// the Path string passed to SVG path attributes
type Path = string;

// the measurements that make up an SVG Circle
type Circle = {
  cx: number,
  cy: number,
  radius: number,
};

export default {
  Coordinate,
  Polygon,
  Area,
  Board,
  Position,
  Path,
  Circle,
};
