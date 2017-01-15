import React from 'react'
import css from 'next/css'
import { colors } from '../constants'
import DropShadowDefinition from './DropShadowDefinition'

const style = {
  main: css({
    fill: colors.background,
    display: 'block',
    margin: '0 auto',
  }),
}

const Board = ({ children, boardPx }) => (
  <svg
    id="boardSvg"
    width={boardPx}
    height={boardPx}
    className={style.main}
  >
    <rect id="boardBackground" width="100%" height="100%" />
    <DropShadowDefinition />
    { children }
  </svg>
)
Board.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  boardPx: React.PropTypes.number,
}

export default Board
