import React from 'react'
import css from 'next/css'

const style = {
  main: css({
    fill: 'Gainsboro',
    display: 'block',
    margin: '0 auto',
  }),
};

const OriginMarker = ({ boardSizePx }) => {
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
    <path d={originMarkerPath(boardSizePx)} fill='none' stroke='#000' strokeWidth='1' strokeOpacity='0.5'/>
  )
}

const Board = ({ children, boardSizePx }) => {
  return (
    <svg id='boardSvg' width={boardSizePx} height={boardSizePx} className={style.main}>
      <rect id='boardBackground' width='100%' height='100%' ></rect>
      { children }
      <OriginMarker boardSizePx={boardSizePx}/>
    </svg>
  );
}

export default Board
