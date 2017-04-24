import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import { colors, sizes, zIndexes } from '../constants';

const styles = {
  wrapper: style({
    backgroundColor: colors.chat,
    flex: `0 1 ${sizes.chatWidth}`,
    zIndex: zIndexes.chat,
    boxShadow: `0 0 ${sizes.shadow} ${colors.black}`,
    '@media(max-width: 850px)': {
      display: 'none',
    },
  }),
};

const Wrapper = ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);
Wrapper.propTypes = {
  children: PropTypes.any, //eslint-disable-line
};

export default Wrapper;
