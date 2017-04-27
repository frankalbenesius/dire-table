import React from 'react';
import { css } from 'glamor';
import { colors } from '../constants';

const styles = {
  wrapper: css({
    borderBottom: `1px solid ${colors.gray}`,
    padding: '0.5rem 1rem',
    textAlign: 'center',
    color: colors.black,
    display: 'block',
    textDecoration: 'none',
  }),
  h1: css({
    fontFamily: 'Vulf Mono Bold',
    fontSize: '1.2rem',
    color: colors.brand,
    marginBottom: '0.1rem',
  }),
  h2: css({
    fontFamily: 'Vulf Mono Bold Italic',
    fontSize: '0.8rem',
  }),
  brand: css(
    {
      // color: colors.brand,
    },
  ),
};

export default () => (
  <a rel="noopener noreferrer" target="_blank" href="https://dire.tools" className={styles.wrapper}>
    <h1 className={styles.h1}>Dire Table</h1>
    <h2 className={styles.h2}>by <span className={styles.brand}>dire.tools</span></h2>
  </a>
);
