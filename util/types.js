// the unit position relative to the board origin at (0, 0)
export type Coordinate = {
  x: number,
  y: number,
};

// one of the shapes that make up an area (a visible shape while hole shapes)
export type Polygon = Array<Coordinate>;

// a visible shape that may have hole shapes
export type Area = Array<Polygon>;

// the context values needed to translate Coordinates and Positions
export type Board = {
  squarePx: number,
  centerPx: number,
};
// the pixel position relative to the boards top left corner
export type Position = {
  x: number,
  y: number,
};

// the Path string passed to SVG path attributes
export type Path = string;

// the measurements that make up an SVG Circle
export type Circle = {
  cx: number,
  cy: number,
  radius: number,
};
