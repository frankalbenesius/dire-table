import React from 'react'
import css from 'next/css'
import { colors } from '../../constants'
import createMapUtils from './mapUtils'
import DropShadowDefinition from './DropShadowDefinition'

const style = {
  main: css({
    fill: colors.background,
    display: 'block',
    margin: '0 auto',
  }),
}

const Board = ({ children, centerPx, boardPx, unitPx }) => {
  const mapUtils = createMapUtils(centerPx, unitPx)
  const childrenWithProps = React.Children.map(children,
    child => React.cloneElement(child, {
      mapUtils,
    }),
  )
  return (
    <svg id="boardSvg" width={boardPx} height={boardPx} className={style.main}>
      <rect id="boardBackground" width="100%" height="100%" />
      <DropShadowDefinition />
      { childrenWithProps }
    </svg>
  )
}
Board.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  centerPx: React.PropTypes.number,
  boardPx: React.PropTypes.number,
  unitPx: React.PropTypes.number,
}

export default Board
