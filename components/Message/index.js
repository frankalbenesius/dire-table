import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { colors, sizes } from '../constants';

const lineHeight = 0.9;
const MessageWrapper = glamorous.div({
  lineHeight: `${lineHeight}rem`,
  margin: '0.4rem 0',
});

const Text = glamorous.div({});

const RollFormula = glamorous.div({
  color: colors.black,
});
const RollEvaluation = glamorous.div({
  color: colors.black,
  maxHeight: `${lineHeight * 8}rem`,
  paddingBottom: '0.3rem',
  overflowY: 'auto',
});
const RollValue = glamorous.div({
  color: colors.text,
  fontSize: '1rem',
  fontFamily: 'Vulf Mono Bold',
});
const Roll = ({ roll, player }) => {
  const RollWrapper = glamorous.div({
    border: `1px solid ${player.color}`,
    borderRadius: sizes.radius,
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: colors.white,
  });
  return (
    <RollWrapper>
      <RollFormula>{roll.formula}</RollFormula>
      <RollEvaluation>{roll.evaluation}</RollEvaluation>
      <RollValue>{roll.value}</RollValue>
    </RollWrapper>
  );
};
Roll.propTypes = {
  player: PropTypes.object,
  roll: PropTypes.object,
};

const SystemMessage = glamorous.div({
  fontFamily: 'Vulf Mono Light Italic',
  textAlign: 'center',
  padding: '0 1rem',
  color: colors.black,
  marginTop: '1rem',
});
// "Welcome to Dire Table! Your table's invite link is https://table.dire.tools/1234"

const createMessageContent = (type, content, player) => {
  switch (type) {
    case 'roll': {
      return <Roll roll={content} player={player} />;
    }
    case 'text': {
      return <Text>{content}</Text>;
    }
    case 'system': {
      return <SystemMessage>{content}</SystemMessage>;
    }
    default: {
      return null;
    }
  }
};

const Message = ({ content, player, type }) => (
  <MessageWrapper>
    {createMessageContent(type, content, player)}
  </MessageWrapper>
);
Message.propTypes = {
  content: PropTypes.any, //eslint-disable-line
  player: PropTypes.object,
  type: PropTypes.string,
};

export default Message;
