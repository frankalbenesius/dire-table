import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../database';
import { getMessages } from '../../store/reducers/chat';
import { getPlayer, getRoster } from '../../store/reducers/players';
import { setMessages } from '../../store/actions';

import createMessage from './createMessage';

import ChatHeader from '../../components/ChatHeader';
import ChatWrapper from '../../components/ChatWrapper';
import ChatInput from '../../components/ChatInput';
import Messages from '../../components/Messages';

const mapStateToProps = state => ({
  messages: getMessages(state.chat),
  roster: getRoster(state.players),
  player: getPlayer(state.players),
});

const mapDispatchToProps = dispatch => ({
  sendMyMessage: player => (text) => {
    const newMessage = createMessage(player.id, text);
    if (newMessage.type !== 'error') {
      database.ref('/messages').push(newMessage);
    } else {
      // TODO: do something with the error
    }
  },
  setMessages: messages => dispatch(setMessages(messages)),
});

// TODO: Messages & ChatInput #containerSplit
class Chat extends React.Component {
  componentDidMount() {
    database.ref('/messages').on('value', (snap) => {
      this.props.setMessages(snap.val() || {});
    });
  }
  render() {
    return (
      <ChatWrapper>
        <ChatHeader />
        <Messages messages={this.props.messages} roster={this.props.roster} />
        <ChatInput onSubmit={this.props.sendMyMessage(this.props.player)} />
      </ChatWrapper>
    );
  }
}
Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  roster: PropTypes.arrayOf(PropTypes.object),
  player: PropTypes.object,
  sendMyMessage: PropTypes.func,
  setMessages: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
