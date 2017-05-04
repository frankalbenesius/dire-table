import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import { colors, sizes } from '../constants';

const Roster = ({ players, onPlayerClick }) => {
  const playersList = players
    ? Object.keys(players).reduce(
        (acc, playerId) => [
          ...acc,
          {
            ...players[playerId],
            key: playerId,
          },
        ],
        [],
      )
    : [];
  const styles = {
    wrapper: css({
      position: 'absolute',
      left: '0',
      bottom: '0',
      margin: sizes.overlayPadding,
      padding: '0.5rem 0.5rem 0',
      pointerEvents: 'none',
      border: `2px solid ${colors.black}`,
      backgroundColor: colors.tools,
      textAlign: 'center',
    }),
    header: css({
      height: '100%',
      fontFamily: 'Vulf Mono Bold Italic',
      paddingBottom: '0.5rem',
    }),
    playerName: css({
      fontFamily: 'Vulf Mono Regular',
      fontSize: '0.8rem',
      userSelect: 'none',
      pointerEvents: 'auto',
      cursor: 'default',
      paddingBottom: '0.5rem',
    }),
  };
  if (playersList.length < 1) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Players</h1>
      {playersList.filter(p => p.connected).map(player => (
        <div
          key={player.key}
          style={{ color: player.gm ? colors.text : player.color }}
          onMouseDown={() => onPlayerClick(player.key)}
          className={styles.playerName}
        >
          {player.gm ? <span>{'GM '}</span> : null}
          {player.name}
        </div>
      ))}
    </div>
  );
};
Roster.propTypes = {
  players: PropTypes.object,
  onPlayerClick: PropTypes.func,
};

export default Roster;
