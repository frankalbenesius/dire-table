import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { sizes } from '../constants';

import Token from '../Token';

const tokenSize = 50;

const styles = {
  wrapper: css({
    position: 'absolute',
    left: '0',
    bottom: '0',
    padding: sizes.overlayPadding,
    fill: '#000',
    width: '100%',
  }),
  svg: css({
    height: `${tokenSize}px`,
    width: '100%',
  }),
};

const Inventory = ({ tokens }) => (
  <div className={styles.wrapper}>
    <svg className={styles.svg}>
      {tokens.map((token, i) => (
        <Token
          key={token.id}
          id={token.id}
          player={token.player}
          icon={token.icon}
          cx={tokenSize * i + tokenSize / 2}
          cy={tokenSize / 2}
          radius={25}
          draggable={false}
          dragging={false}
        />
      ))}
    </svg>
  </div>
);
Inventory.propTypes = {
  tokens: PropTypes.array,
};

export default Inventory;
