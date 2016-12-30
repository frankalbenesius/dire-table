import palette from './palette'

// colors
export const colors = {
  brand: palette.base,
  foreground: 'Gainsboro',
  background: 'SlateGrey',
  chat: 'Gainsboro',
  void: palette.black,
  shadow: palette.black,
  fog: '#2c3339', //http://www.color-hex.com/color/708090
}
// brand: e33d27
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
