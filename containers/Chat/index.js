import React from 'react';
import PropTypes from 'prop-types';

import ChatInput from '../../containers/ChatInput';
import Messages from '../../containers/Messages';

import ChatHeader from '../../components/ChatHeader';
import ChatWrapper from '../../components/ChatWrapper';

// TODO: Messages & ChatInput #containerSplit
const Chat = ({ playerKey, table }) => (
  <ChatWrapper>
    <ChatHeader />
    <Messages table={table} />
    <ChatInput table={table} playerKey={playerKey} />
  </ChatWrapper>
);
Chat.propTypes = {
  table: PropTypes.string,
  playerKey: PropTypes.string,
};

export default Chat;
