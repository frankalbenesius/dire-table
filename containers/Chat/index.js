import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import roller from 'rpgdicejs';
import trim from 'lodash/trim';

import database from '../../store/database';

import { getMessages } from '../../store/reducers/chat';
import { setMessages } from '../../store/actions';

import ChatHeader from '../../components/ChatHeader';
import ChatWrapper from '../../components/ChatWrapper';
import ChatInput from '../../components/ChatInput';
import Messages from '../../components/Messages';

const createMessage = (myId, text) => {
  const commandRegex = /\/([a-zA-Z]+)( .*)?/g; // matches /letters and optional argument
  const match = commandRegex.exec(text);
  if (match) {
    const command = match[1];
    const argument = match[2] ? trim(match[2]) : ''; // get rid of leading whitespace
    if ((command === 'roll' || command === 'r') && argument) {
      try {
        const result = roller.eval(argument);
        return {
          player: myId,
          timestamp: Date.now(),
          type: 'roll',
          content: {
            formula: argument,
            evaluation: result.render(),
            value: result.value,
          },
        };
      } catch (e) {
        // Error: failed to parse roll
        return {
          myId,
          timestamp: Date.now(),
          type: 'error',
          content: 'Failed to parse roll.',
        };
      }
    }
    // Error: command doesn't exist
    return {
      myId,
      timestamp: Date.now(),
      type: 'error',
      content: "Command doesn't exist.",
    };
  }
  return {
    player: myId,
    timestamp: Date.now(),
    type: 'text',
    content: text,
  };
};

const mapStateToProps = state => ({
  messages: getMessages(state.chat),
  players: state.players,
  myId: state.player.id,
});

const mapDispatchToProps = dispatch => ({
  sendMyMessage: myId => (text) => {
    const newMessage = createMessage(myId, text);
    database.ref('/messages').push(newMessage);
    // return dispatch(sendMessage(myId, text));
  },
  setMessages: messages => dispatch(setMessages(messages)),
});

// TODO: Messages & ChatInput #containerSplit
class Chat extends React.Component {
  componentDidMount() {
    database.ref('/messages').on('value', (snap) => {
      this.props.setMessages(snap.val() || []);
    });
  }
  render() {
    return (
      <ChatWrapper>
        <ChatHeader />
        <Messages messages={this.props.messages} players={this.props.players} />
        <ChatInput onSubmit={this.props.sendMyMessage(this.props.myId)} />
      </ChatWrapper>
    );
  }
}
Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  players: PropTypes.object,
  myId: PropTypes.number,
  sendMyMessage: PropTypes.func,
  setMessages: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
