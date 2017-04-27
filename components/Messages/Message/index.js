import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import formatDate from 'date-fns/format';
import { colors, sizes } from '../../constants';

const styles = {
  wrapper: style({
    lineHeight: '0.9rem',
  }),
  content: style({
    margin: '0.4rem 0',
  }),
  text: style({}),
  roll: style({
    border: `1px solid ${colors.gray}`,
    borderRadius: sizes.radius,
    padding: '0.5rem',
    backgroundColor: colors.white,
  }),
  rollFormula: style({
    color: colors.black,
  }),
  rollEvaluation: style({
    color: colors.black,
  }),
  rollValue: style({
    color: colors.text,
    fontSize: '1rem',
    marginTop: '0.3rem',
    fontFamily: 'Vulf Mono Bold',
  }),
};

const getHeaderStyles = (player) => {
  const color = player.id > 0 ? colors.player[player.id] : colors.text;
  return style({
    color,
    margin: '1rem 0 0',
    fontFamily: 'Vulf Mono Bold',
  });
};

const Text = ({ children }) => <div className={styles.text}>{children}</div>;
Text.propTypes = { children: PropTypes.node };

const Roll = ({ roll }) => {
  console.log('evaluation', roll.evaluation);
  return (
    <div className={styles.roll}>
      <div className={styles.rollFormula}>{roll.formula}</div>
      <div className={styles.rollEvaluation}>{roll.evaluation}</div>
      <div className={styles.rollValue}>{roll.value}</div>
    </div>
  );
};
Roll.propTypes = {
  roll: PropTypes.object,
};

const Message = ({ showHeader, content, player, timestamp, type }) => (
  <div title={formatDate(timestamp, 'M/D/YY h:mm A')} className={styles.wrapper}>
    {showHeader ? <div className={getHeaderStyles(player)}>{player.name}</div> : null}

    <div className={styles.content}>
      {type === 'text' ? <Text>{content}</Text> : <Roll roll={content} />}
    </div>
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
