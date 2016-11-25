import React from 'react'
import css from 'next/css'

const gridPath = cellSize => [
    'M', cellSize, 0,
    'L', 0, 0,
    'L', 0, cellSize,
  ].join(' ');

const Grid = ({ cellSize }) => {
  return (
    <g>
      <defs>
        <pattern id='gridPattern' width={cellSize} height={cellSize} patternUnits='userSpaceOnUse'>
          <path d={gridPath(cellSize)} fill='none' stroke='#000' strokeWidth='1' strokeOpacity='0.5'/>
        </pattern>
      </defs>
      <rect id='grid' width='100%' height='100%' fill='url(#gridPattern)'></rect>
    </g>
  );
}

const Board = ({ children, cellSize, boardSize}) => {
  // putting in some real effort here trying to center this board
  // will eventually only want to begin with the board centered
  // hopefully 'dragging' the board will only need to set x & y offsets
  const pixelWidth = cellSize * boardSize + 1; // +1px for final cell stroke
  const translateBoard = width => `translate(${width/-2},${width/-2})`;
  const originMarkerPath = (width) => {
    const center = width / 2;
    return [
      'M', center - 5, center - 5,
      'L', center + 5, center + 5,
      'M', center + 5, center - 5,
      'L', center - 5, center + 5,
    ].join(' ');
  };
  return (
    <g transform={translateBoard(pixelWidth)}>
      <svg x='50%' y='50%' width={pixelWidth} height={pixelWidth}>
        <rect id='boardBackground' width='100%' height='100%' className={style.board} ></rect>
        { children }
        <path d={originMarkerPath(pixelWidth)} fill='none' stroke='#000' strokeWidth='1' strokeOpacity='0.5'/>
      </svg>
    </g>
  );
}

export default ({ cellSize = 75, boardSize = 50 }) => {
  return (
    <div className={style.svgWrapper}>
      <svg width='100%' height='100%' className={style.svg}>
        <Board cellSize={cellSize} boardSize={boardSize} >
          {/* <Areas /> */}
          {/* <Tokens /> */}
          {/* <Fog /> */}
          <Grid cellSize={cellSize} />
        </Board>
      </svg>
    </div>
  )
}

const style = {
  svgWrapper: css({
    backgroundColor: 'SlateGrey',
    flex: '1',
  }),
  svg: css({
    display: 'block', // necessary to get rid of extra space from inline elements
  }),
  board: css({
    fill: 'Gainsboro',
  }),
};
