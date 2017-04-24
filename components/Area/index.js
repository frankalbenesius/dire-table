import React from 'react';
import PropTypes from 'prop-types';
import { colors, sizes } from '../constants';

const Area = ({ path }) => (
  <path
    d={path}
    fill={colors.foreground}
    stroke={colors.background}
    strokeWidth={sizes.areaStroke}
  />
);

Area.propTypes = {
  path: PropTypes.string,
};

export default Area;
