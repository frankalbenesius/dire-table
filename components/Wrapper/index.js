import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';

const styles = style({
  height: '100%',
  display: 'flex',
});

const Wrapper = ({ children }) => (
  <div className={styles}>
    {children}
  </div>
);
Wrapper.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

export default Wrapper;
