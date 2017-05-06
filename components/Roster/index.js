import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Tag from '../Tag';
import { colors, sizes } from '../constants';

const Roster = ({ player, players, onPlayerClick }) => {
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
  const nameStyles = {
    fontFamily: 'Vulf Mono Regular',
    fontSize: '0.8rem',
    userSelect: 'none',
    pointerEvents: 'none',
    cursor: 'default',
    paddingBottom: '0.5rem',
  };
  if (player.gm) {
    nameStyles.pointerEvents = 'auto';
    nameStyles[':hover'] = {
      cursor: 'pointer',
      textDecoration: 'underline',
    };
  }
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
      boxShadow: `0 0 0.6rem ${colors.black}`,
      textAlign: 'center',
    }),
    header: css({
      height: '100%',
      fontFamily: 'Vulf Mono Bold Italic',
      paddingBottom: '0.5rem',
    }),
    playerName: css(nameStyles),
  };
  if (playersList.length < 1) {
    return null;
  }
  const handleClick = clickedPlayer => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (player.gm) {
      onPlayerClick(clickedPlayer.key);
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Players</h1>
      {playersList.filter(p => p.connected).map(p => (
        <div
          key={p.key}
          style={{ color: p.gm ? colors.text : p.color }}
          onMouseDown={handleClick(p)}
          className={styles.playerName}
        >
          {p.name}
          {p.gm ? <Tag>{'GM'}</Tag> : null}
        </div>
      ))}
    </div>
  );
};
Roster.propTypes = {
  player: PropTypes.object,
  players: PropTypes.object,
  onPlayerClick: PropTypes.func,
};

export default Roster;
