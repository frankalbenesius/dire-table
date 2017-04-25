import React from 'react';
import PropTypes from 'prop-types';
import Token from '../../components/Token';
import { toCircle, toCoordinate } from '../../util/board';

const TokenCursor = ({ active, cursor, board, tokenIdToAdd }) => {
  if (active) {
    const { radius, cx, cy } = toCircle(board, toCoordinate(board, cursor));
    return <Token player={tokenIdToAdd} icon="smile" cx={cx} cy={cy} radius={radius} cursor />;
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
  tokenIdToAdd: PropTypes.number,
};

export default TokenCursor;
