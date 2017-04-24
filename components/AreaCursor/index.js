import React from 'react';
import PropTypes from 'prop-types';
import { toAreaCursor } from '../../util/areas';
import { toPath, toCoordinate, toPosition } from '../../util/board';
import { colors, sizes, opacity } from '../constants';

const AreaCursor = ({ adding, removing, cursor, board }) => {
  if (adding) {
    const cursorCoordinate = toCoordinate(board, cursor);
    const area = toAreaCursor(cursorCoordinate);
    const path = toPath(board, area);
    return <path d={path} fill={colors.selection} opacity={opacity} />;
  }
  if (removing) {
    const pos = toPosition(board)(toCoordinate(board, cursor, 2));
    return (
      <circle
        cx={pos.x}
        cy={pos.y}
        r={sizes.tokenPadding}
        fill={colors.selection}
        opacity={opacity}
      />
    );
  }
  return null;
};
AreaCursor.propTypes = {
  adding: PropTypes.bool,
  removing: PropTypes.bool,
  board: PropTypes.object,
  cursor: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default AreaCursor;
