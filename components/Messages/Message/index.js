import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import formatDate from 'date-fns/format';
import { colors } from '../../constants';

const styles = {
  message: style({
    margin: '0.5rem 0',
  }),
  roll: style({
    padding: '1rem',
    color: colors.black,
    textAlign: 'center',
    borderColor: colors.fog,
    borderWidth: '1px',
    borderStyle: 'solid',
  }),
};

const playerHeaderStyles = i =>
  style({
    color: colors.player[i],
    marginTop: '1em',
    fontFamily: 'Vulf Mono Bold',
  });

const Roll = () => <div className={styles.roll}>Dice Roll Display TBD</div>;

const Message = ({ showHeader, content, player, timestamp, type }) => (
  <div title={formatDate(timestamp, 'M/D/YY h:mm A')} className={styles.message}>
    {showHeader ? <div className={playerHeaderStyles(player.id)}>{player.name}</div> : null}

    {type === 'text' ? <div>{content}</div> : <Roll />}
  </div>
);
Message.propTypes = {
  showHeader: PropTypes.bool,
  content: PropTypes.any, //eslint-disable-line
  player: PropTypes.object,
  timestamp: PropTypes.number,
  type: PropTypes.string,
};

export default Message;
