/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import RollMessage from './RollMessage';
import WelcomeMessage from './WelcomeMessage';
import ErrorMessage from './ErrorMessage';
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

const Message = ({ type, content, fromPlayer, thisPlayer, tableKey, players, resend }) => {
  let innerMessage;
  const resendRoll = (formula) => {
    resend(`/r ${formula}`);
  };
  switch (type) {
    case 'roll': {
      innerMessage = (
        <RollMessage onFormulaClick={resendRoll} roll={content} fromPlayer={fromPlayer} />
      );
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
    case 'error': {
      innerMessage = <ErrorMessage>{content}</ErrorMessage>;
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
  resend: PropTypes.func,
};

export default Message;
