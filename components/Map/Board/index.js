import React from 'react'
import css from 'next/css'

const style = {
  main: css({
    fill: 'Gainsboro',
    display: 'block',
    margin: '0 auto',
  }),
}

const OriginMarker = ({ boardSizePx }) => {
  const originMarkerPath = (width) => {
    const center = width / 2
    return [
      'M', center - 5, center - 5,
      'L', center + 5, center + 5,
      'M', center + 5, center - 5,
      'L', center - 5, center + 5,
    ].join(' ')
  }
  return (
    <path
      d={originMarkerPath(boardSizePx)}
      fill="none"
      stroke="#000"
      strokeWidth="1"
      strokeOpacity="0.5"
    />
  )
}
OriginMarker.propTypes = {
  boardSizePx: React.propTypes.number,
}

const Board = ({ children, boardSizePx }) => (
  <svg id="boardSvg" width={boardSizePx} height={boardSizePx} className={style.main}>
    <rect id="boardBackground" width="100%" height="100%" />
    { children }
    <OriginMarker boardSizePx={boardSizePx} />
  </svg>
)
Board.propTypes = {
  children: React.PropTypes.element,
  boardSizePx: React.PropTypes.number,
}

export default Board
