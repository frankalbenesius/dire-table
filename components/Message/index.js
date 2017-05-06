/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import WelcomeMessage from './WelcomeMessage';
import Tag from '../Tag';
import { colors, sizes } from '../constants';

const lineHeight = 0.9;
const MessageWrapper = glamorous.div({
  lineHeight: `${lineHeight}rem`,
  margin: '0.4rem 0',
});

const Text = glamorous.div({});
const DisplayName = glamorous.span({
  fontFamily: 'Vulf Mono Bold Italic',
});

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
  color: colors.black,
  marginTop: '1rem',
  borderRadius: sizes.radius,
  padding: '0.5rem',
  border: `1px solid ${colors.gray}`,
});

const ConnectionMessage = (props) => {
  if (props.connectedPlayer.key === props.thisPlayer.key) {
    return (
      <SystemMessage>
        <WelcomeMessage tableKey={props.tableKey} player={props.thisPlayer} />
      </SystemMessage>
    );
  }
  return (
    <SystemMessage>
      <DisplayName style={{ color: props.connectedPlayer.color }}>
        {props.connectedPlayer.name}
        {props.connectedPlayer.gm ? <Tag>{'GM'}</Tag> : null}
      </DisplayName> has joined.
    </SystemMessage>
  );
};
ConnectionMessage.propTypes = {
  connectedPlayer: PropTypes.object,
  thisPlayer: PropTypes.object,
  tableKey: PropTypes.string,
};

const Message = ({ type, content, fromPlayer, thisPlayer, tableKey, players }) => {
  let innerMessage;
  switch (type) {
    case 'roll': {
      innerMessage = <Roll roll={content} player={fromPlayer} />;
      break;
    }
    case 'text': {
      innerMessage = <Text>{content}</Text>;
      break;
    }
    case 'connected': {
      const connectedPlayer = {
        ...players[content],
        key: content,
      };
      innerMessage = (
        <ConnectionMessage
          connectedPlayer={connectedPlayer}
          tableKey={tableKey}
          thisPlayer={thisPlayer}
        />
      );
      break;
    }
    default: {
      innerMessage = null;
      break;
    }
  }
  return <MessageWrapper>{innerMessage}</MessageWrapper>;
};
Message.propTypes = {
  type: PropTypes.string,
  content: PropTypes.any, //eslint-disable-line
  fromPlayer: PropTypes.object,
  players: PropTypes.object,
  thisPlayer: PropTypes.object,
  tableKey: PropTypes.string,
};

export default Message;
