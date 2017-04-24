import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { colors } from '../constants';
import DropShadowDefinition from './DropShadowDefinition';

const styles = css({
  fill: colors.background,
  display: 'block',
  margin: '0 auto',
});

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
    {children}
  </svg>
);
Board.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  boardPx: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseMove: PropTypes.func,
};

export default Board;
