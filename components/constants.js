import palette from './palette'

// colors
const scheme = 'gray'
export const colors = {
  brand: palette.base,
  foreground: palette[scheme][2],
  background: palette[scheme][7],
  chat: palette[scheme][2],
  fog: palette[scheme][9],
  void: palette.black,
  shadow: palette.black,
  player: [
    palette.gray[0],
    palette.red[5], // red (currently "brand", also)
    palette.blue[6],
    palette.green[7],
    palette.orange[5],
    palette.fuschia[6],
    palette.cyan[5],
  ],
}

// sizes
const baseStroke = 4
export const sizes = {
  borderRadius: '5px',
  shadow: '15px',
  chatWidth: '300px',
  fogStroke: `${baseStroke}px`,
  areaStroke: `${baseStroke * 2}px`,
  tokenPadding: `${baseStroke + 3}px`,
}

// z-index
export const zIndexes = {
  map: 0,
  chat: 1,
  hover: 2,
}

export const noPx = str => parseInt(str.slice(0, -2), 10)
