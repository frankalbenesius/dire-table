import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../store/actions';

import ChatWrapper from '../../components/ChatWrapper';
import Messages from '../../components/Messages';

const mapStateToProps = state => ({
  chat: state.chat,
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

const Chat = ({ chat, players }) => (
  <ChatWrapper>
    <Messages messages={chat} players={players} />
    {/* <ChatInput /> */}
  </ChatWrapper>
);
Chat.propTypes = {
  chat: PropTypes.arrayOf(PropTypes.object),
  players: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
