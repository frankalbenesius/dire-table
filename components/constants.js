import palette from './palette';

// colors
const scheme = 'gray';
const white = palette.gray[0];
const black = palette.black;
const gray = palette.gray[6];
const red = palette.red[5];
const blue = palette.blue[5];
const green = palette.green[7];
const orange = palette.orange[6];
const pink = palette.fuschia[5];
const cyan = palette.cyan[5];
export const colors = {
  brand: palette.base, // red
  black,
  white,
  gray,
  red,
  blue,
  green,
  orange,
  pink,
  cyan,
  text: '#000',
  foreground: palette[scheme][2],
  background: palette[scheme][7],
  fog: palette[scheme][9],
  chat: palette.gray[2],
  input: palette.gray[4],
  tools: palette.gray[2],
  selection: palette.cyan[2],
  player: [white, red, blue, green, orange, pink, cyan],
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
