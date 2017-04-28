import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../store/database';
import { getMessages } from '../../store/reducers/chat';
import { getPlayer } from '../../store/reducers/player';
import { getPlayers } from '../../store/reducers/players';
import { setMessages } from '../../store/actions';

import createMessage from './createMessage';

import ChatHeader from '../../components/ChatHeader';
import ChatWrapper from '../../components/ChatWrapper';
import ChatInput from '../../components/ChatInput';
import Messages from '../../components/Messages';

const mapStateToProps = state => ({
  messages: getMessages(state.chat),
  players: getPlayers(state.players).byId,
  myId: getPlayer(state.player).id,
});

const mapDispatchToProps = dispatch => ({
  sendMyMessage: myId => (text) => {
    const newMessage = createMessage(myId, text);
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
