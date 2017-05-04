import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { colors, sizes } from '../constants';

const styles = {
  wrapper: css({
    boxSizing: 'border-box',
    width: '50px',
    display: 'flex',
    position: 'absolute',
    left: sizes.overlayPadding,
    top: sizes.overlayPadding,
    border: `2px solid ${colors.black}`,
    boxShadow: `0 0 0.6rem ${colors.black}`,
    fill: '#000',
  }),
};

const Toolbar = ({ children }) => (
  <div className={styles.wrapper}>
    <div>
      {children}
    </div>
  </div>
);
Toolbar.propTypes = {
  children: PropTypes.node,
};

export default Toolbar;
