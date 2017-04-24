import React from 'react';
import PropTypes from 'prop-types';
import Token from '../../components/Token';
import { toCircle, toCoordinate } from '../../utilities/map';

const TokenCursor = ({ active, cursor, board }) => {
  if (active) {
    const { radius, cx, cy } = toCircle(board, toCoordinate(board, cursor));
    return <Token player={0} icon="neutral" cx={cx} cy={cy} radius={radius} cursor />;
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
};

export default TokenCursor;
