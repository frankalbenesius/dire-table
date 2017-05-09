import React from 'react';
import PropTypes from 'prop-types';
import Token from '../../components/Token';
import { toCircle, toCoordinate } from '../../util/board';

const TokenCursor = ({ active, cursor, board, newTokenPlayer }) => {
  if (active) {
    const { radius, cx, cy } = toCircle(board, toCoordinate(board, cursor));
    return (
      <Token player={newTokenPlayer} icon="smile" cx={cx} cy={cy} radius={radius} transparent />
    );
  }
  return null;
};
TokenCursor.propTypes = {
  active: PropTypes.bool,
  board: PropTypes.object,
  cursor: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  newTokenPlayer: PropTypes.object,
};

export default TokenCursor;
