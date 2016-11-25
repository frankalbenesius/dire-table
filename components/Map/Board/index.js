import React from 'react'
import css from 'next/css'
import { colors } from '../../constants'

const style = {
  main: css({
    fill: colors.background,
    display: 'block',
    margin: '0 auto',
  }),
}

const Board = ({ children, boardSizePx }) => (
  <svg id="boardSvg" width={boardSizePx} height={boardSizePx} className={style.main}>
    <rect id="boardBackground" width="100%" height="100%" />
    { children }
  </svg>
)
Board.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  boardSizePx: React.PropTypes.number,
}

export default Board
