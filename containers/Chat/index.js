import React from 'react';
import PropTypes from 'prop-types';

import ChatInput from '../../containers/ChatInput';
import Messages from '../../containers/Messages';

import ChatHeader from '../../components/ChatHeader';
import ChatWrapper from '../../components/ChatWrapper';

// TODO: Messages & ChatInput #containerSplit
class Chat extends React.Component {
  state = { errors: [] };
  handleError = (error) => {
    this.setState({
      errors: [...this.state.errors, error],
    });
  };
  render() {
    const { table, playerKey } = this.props;
    return (
      <ChatWrapper>
        <ChatHeader />
        <Messages
          errors={this.state.errors}
          onError={this.handleError}
          tableKey={table}
          playerKey={playerKey}
        />
        <ChatInput onError={this.handleError} tableKey={table} playerKey={playerKey} />
      </ChatWrapper>
    );
  }
}
Chat.propTypes = {
  table: PropTypes.string,
  playerKey: PropTypes.string,
};

export default Chat;
