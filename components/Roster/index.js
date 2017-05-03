import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { sizes } from '../constants';

const tokenSize = 50;

const Roster = ({ roster, onPlayerClick }) => {
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
        {roster.filter(p => p.connected).map((player, i) => (
          <g key={player.id}>
            <text
              onMouseDown={() => onPlayerClick(player.id)}
              className={styles.label}
              x={0}
              y={inventoryHeight - (tokenSize * i + tokenSize / 2)}
              dy={4}
              textAnchor={'start'}
            >
              {player.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
Roster.propTypes = {
  roster: PropTypes.arrayOf(PropTypes.object),
  onPlayerClick: PropTypes.func,
};

export default Roster;
