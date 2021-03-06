import palette from './palette';

// colors
const scheme = 'gray';
const white = palette.gray[0];
const black = palette.black;
const gray = palette.gray[5];
const red = palette.red[5];
const orange = palette.orange[6];
// const lime = palette.lime[6]; // too close to green
const green = palette.green[6];
const teal = palette.teal[8];
const cyan = palette.cyan[6];
const blue = palette.blue[6];
// const indigo = palette.indigo[5]; // too close to purple
const violet = palette.violet[5];
const fuschia = palette.fuschia[4];
// const pink = palette.pink[5]; // fuschia is better
const pureBlack = '#000';
export const colors = {
  brand: palette.base, // red
  black,
  white,
  gray,
  red,
  blue,
  green,
  teal,
  orange,
  fuschia,
  cyan,
  text: pureBlack,
  foreground: palette[scheme][2],
  background: palette[scheme][7],
  fog: palette[scheme][9],
  chat: palette.gray[2],
  tools: palette.gray[2],
  selection: palette.cyan[2],
  button: palette.blue[5],
  buttonActive: palette.blue[7],
  gm: pureBlack,
  player: [red, orange, green, teal, cyan, blue, violet, fuschia],
  // yellow, lime,
  disconnected: gray,
};

// sizes
const baseStroke = 4; // should be 18% of cell size
export const areaStroke = baseStroke + 2;
const tokenPadding = baseStroke + 3;
export const sizes = {
  shadow: '1rem',
  chatWidth: '20rem',
  fogStroke: `${baseStroke}px`,
  areaStroke: `${areaStroke}px`,
  tokenPadding: `${tokenPadding}px`,
  text: '0.8rem',
  overlayPadding: '1.5rem',
  radius: '0.1rem',
};

// z-index
export const zIndexes = {
  map: 0,
  chat: 1,
  hover: 2,
};

export const opacity = 0.7;

export const noPx = str => parseInt(str.slice(0, -2), 10);
