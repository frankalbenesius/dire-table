import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { sizes } from '../constants';

import Token from '../Token';

const tokenSize = 50;

const Roster = ({ roster, tokens, onPlayerClick }) => {
  const inventoryHeight = tokenSize * roster.length;
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
      userSelect: 'none',
    }),
  };
  return (
    <div className={styles.wrapper}>
      <svg className={styles.svg}>
        {roster.filter(p => p.connected).map((player, i) => {
          let icon = 'smile';
          const playerTokens = tokens.filter(t => t.player === player.id);
          const playerHasAToken = playerTokens.length > 0;
          if (playerHasAToken) {
            icon = playerTokens.sort((a, b) => b.lastUpdated - a.lastUpdated)[0].icon;
          }
          return (
            <g key={player.id}>
              <Token
                playerId={player.id}
                icon={icon}
                cx={tokenSize / 2}
                cy={inventoryHeight - (tokenSize * i + tokenSize / 2)}
                radius={25}
                draggable={false}
                dragging={false}
                onMouseDown={() => onPlayerClick(player.id)}
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
Roster.propTypes = {
  roster: PropTypes.arrayOf(PropTypes.object),
  tokens: PropTypes.array,
  onPlayerClick: PropTypes.func,
};

export default Roster;
