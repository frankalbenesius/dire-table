import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendMessage } from '../../store/actions';

import ChatHeader from '../../components/ChatHeader';
import ChatWrapper from '../../components/ChatWrapper';
import ChatInput from '../../components/ChatInput';
import Messages from '../../components/Messages';

const mapStateToProps = state => ({
  chat: state.chat,
  players: state.players,
  myId: state.player.id,
});

const mapDispatchToProps = dispatch => ({
  sendMyMessage: myId => text => dispatch(sendMessage(myId, text)),
});

// TODO: Messages & ChatInput #containerSplit
const Chat = ({ chat, players, sendMyMessage, myId }) => (
  <ChatWrapper>
    <ChatHeader />
    <Messages messages={chat} players={players} />
    <ChatInput onSubmit={sendMyMessage(myId)} />
  </ChatWrapper>
);
Chat.propTypes = {
  chat: PropTypes.arrayOf(PropTypes.object),
  players: PropTypes.object,
  myId: PropTypes.number,
  sendMyMessage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
