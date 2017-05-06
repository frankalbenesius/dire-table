/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import iconPaths from './icons';

const iconClass = style({
  width: '100%',
  verticalAlign: 'middle',
});

const Icon = ({ icon = 'neutral', styles }) => (
  <svg className={iconClass} styles={styles} viewBox="0 1 19 19">{iconPaths[icon]}</svg>
);
Icon.propTypes = {
  icon: PropTypes.string,
  styles: PropTypes.object,
};

export default Icon;
