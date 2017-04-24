import React from 'react';
import PropTypes from 'prop-types';
import { style, keyframes } from 'glamor';
import { colors, sizes } from '../../components/constants';

const dashLength = 10;
const dashedAnimation = keyframes({
  '0%': { strokeDashoffset: 0 },
  '100%': { strokeDashoffset: dashLength * 2 },
});
const styles = {
  dashedPath: style({
    animation: `${dashedAnimation} 2s linear forwards infinite`,
  }),
};

const Fogs = ({ fogs, opacity, mapUtils }) => (
  <g>
    <defs>
      <mask id="fogWindow">
        {' '}{/* mask: white = yes, black = no */}
        <rect width="100%" height="100%" fill="#fff" mask="url(#fogWindow)" />
        <g>
          {fogs.map((fog, i) => (
            <path
              key={i}
              className={styles.dashedPath}
              d={mapUtils.toPath(fog)}
              fillRule="evenodd"
              fill="#000"
              stroke="#000"
              strokeWidth={sizes.fogStroke}
              strokeDasharray={dashLength}
            />
          ))}
        </g>
      </mask>
    </defs>
    <rect width="100%" height="100%" opacity={opacity} fill={colors.fog} mask="url(#fogWindow)" />
  </g>
);
Fogs.propTypes = {
  opacity: PropTypes.number,
  fogs: PropTypes.arrayOf(PropTypes.array),
  mapUtils: PropTypes.shape({
    toPath: PropTypes.function,
  }),
};

export default Fogs;
