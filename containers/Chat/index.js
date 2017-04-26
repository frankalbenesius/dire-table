import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendMessage } from '../../store/actions';

import ChatWrapper from '../../components/ChatWrapper';
import ChatInput from '../../components/ChatInput';
import Messages from '../../components/Messages';

const mapStateToProps = state => ({
  chat: state.chat,
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  sendMessageFromMe: text => dispatch(sendMessage(text)),
});

// TODO: Messages & ChatInput #containerSplit
const Chat = ({ chat, players, sendMessageFromMe }) => (
  <ChatWrapper>
    <Messages messages={chat} players={players} />
    <ChatInput onSubmit={sendMessageFromMe} />
  </ChatWrapper>
);
Chat.propTypes = {
  chat: PropTypes.arrayOf(PropTypes.object),
  players: PropTypes.object,
  sendMessageFromMe: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
