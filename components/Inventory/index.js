import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { sizes } from '../constants';

import Token from '../Token';

const tokenSize = 50;

const Inventory = ({ players, tokens }) => {
  const inventoryHeight = tokenSize * players.length;
  const styles = {
    wrapper: css({
      position: 'absolute',
      left: '0',
      bottom: '0',
      margin: sizes.overlayPadding,
      height: `${inventoryHeight}px`,
      pointerEvents: 'none',
    }),
    svg: css({
      height: '100%',
    }),
    label: css({
      fontFamily: 'Vulf Mono Bold',
      fontSize: '0.8rem',
    }),
  };
  return (
    <div className={styles.wrapper}>
      <svg className={styles.svg}>
        {players.map((player, i) => {
          let icon = 'smile';
          const playerTokens = tokens.filter(t => t.player === player.id);
          const playerHasAToken = playerTokens.length > 0;
          if (playerHasAToken) {
            icon = playerTokens.sort((a, b) => a.lastUpdated - b.lastUpdated)[0].icon;
          }
          return (
            <g key={player.id}>
              <Token
                player={player.id}
                icon={icon}
                cx={tokenSize / 2}
                cy={inventoryHeight - (tokenSize * i + tokenSize / 2)}
                radius={25}
                draggable={false}
                dragging={false}
              />
              <text
                className={styles.label}
                x={tokenSize + 5}
                y={inventoryHeight - (tokenSize * i + tokenSize / 2)}
                dy={4}
                textAnchor={'start'}
              >
                {player.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
Inventory.propTypes = {
  players: PropTypes.array,
  tokens: PropTypes.array,
};

export default Inventory;
