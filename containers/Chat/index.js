import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPlayer } from '../../store/reducers/players';

import ChatHeader from '../../components/ChatHeader';
import ChatWrapper from '../../components/ChatWrapper';
import ChatInput from '../../components/ChatInput';
import Messages from '../../components/Messages';

const mapStateToProps = state => ({
  player: getPlayer(state.players),
});

// TODO: Messages & ChatInput #containerSplit
const Chat = ({ player, table }) => (
  <ChatWrapper>
    <ChatHeader />
    <Messages table={table} />
    <ChatInput table={table} player={player} />
  </ChatWrapper>
);
Chat.propTypes = {
  table: PropTypes.string,
  player: PropTypes.object,
};

export default connect(mapStateToProps)(Chat);
