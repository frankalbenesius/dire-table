import React from 'react'
import css from 'next/css'
import { colors } from '../constants'
import DropShadowDefinition from './DropShadowDefinition'

const styles = css({
  fill: colors.background,
  display: 'block',
  margin: '0 auto',
})

const Board = ({ children, boardPx, onMouseMove, onMouseDown, onMouseUp }) => (
  <svg
    id="boardSvg"
    width={boardPx}
    height={boardPx}
    className={styles}
    onMouseMove={onMouseMove}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  >
    <rect id="boardBackground" width="100%" height="100%" />
    <DropShadowDefinition />
    { children }
  </svg>
  )
Board.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  boardPx: React.PropTypes.number,
  onMouseDown: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,
}

export default Board
