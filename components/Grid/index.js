import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../constants';

const gridPath = squarePx => ['M', squarePx, 0, 'L', 0, 0, 'L', 0, squarePx].join(' ');

const Grid = ({ squarePx }) => (
  <g>
    <defs>
      <pattern id="gridPattern" width={squarePx} height={squarePx} patternUnits="userSpaceOnUse">
        <path
          d={gridPath(squarePx)}
          fill="none"
          stroke={colors.black}
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </pattern>
    </defs>
    <rect id="grid" width="100%" height="100%" fill="url(#gridPattern)" />
  </g>
);
Grid.propTypes = {
  squarePx: PropTypes.number,
};

export default Grid;
