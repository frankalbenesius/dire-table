import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import formatDate from 'date-fns/format';
import firebase from 'firebase';
import { connect } from 'react-firebase';

import { colors, sizes } from '../../components/constants';

import parseInput from '../../containers/ChatInput/parseInput';
import Message from '../../components/Message';
import Tag from '../../components/Tag';

const MessagesWrapper = glamorous.div({
  fontSize: sizes.text,
  fontFamily: 'Vulf Mono Light',
  lineHeight: '1.618em',
  overflowY: 'scroll',
  height: '100%',
  padding: '0.5rem 1rem',
});

const byTimestamp = (a, b) => a.timestamp - b.timestamp;
const onlyPlayerError = playerKey => (message) => {
  if (message.type !== 'error') {
    return true;
  }
  return message.player === playerKey;
};

class Messages extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      this.scrollTarget.scrollIntoView({ behavior: 'smooth' });
    }, 10); // there may be a better way to do this, like on a callback or something
  }
  render() {
    const messages = this.props.messages
      ? Object.keys(this.props.messages).map(key => ({
        key,
        ...this.props.messages[key],
      }))
      : [];
    const onMyErrors = onlyPlayerError(this.props.playerKey);
    const messagesList = messages.concat(this.props.errors).sort(byTimestamp);
    return (
      <MessagesWrapper>
        {messagesList.filter(onMyErrors).map((m, i, arr) => {
          const fromPlayer = this.props.players[m.player];
          const thisPlayer = this.props.players[this.props.playerKey];
          if (thisPlayer) {
            thisPlayer.key = this.props.playerKey;
          }
          const MessageHeader = glamorous.div({
            padding: '0.5rem 0 0',
            fontFamily: 'Vulf Mono Bold',
            color: fromPlayer ? fromPlayer.color : colors.black,
          });
          const isBroadcastedType = ['text', 'roll'].indexOf(m.type) > -1;
          const isRepeatedPlayer = i >= 1 ? m.player === arr[i - 1].player : false;
          const shouldShowHeader = isBroadcastedType && !isRepeatedPlayer;
          return (
            <div key={`${m.player}${m.timestamp}`} title={formatDate(m.timestamp, 'M/D/YY h:mm A')}>
              {shouldShowHeader
                ? <MessageHeader>
                  {fromPlayer.name}
                  {fromPlayer.gm ? <Tag>{'GM'}</Tag> : null}
                </MessageHeader>
                : null}
              <Message
                content={m.content}
                players={this.props.players}
                tableKey={this.props.tableKey}
                fromPlayer={fromPlayer}
                thisPlayer={thisPlayer}
                type={m.type}
                resend={this.props.resend}
              />
            </div>
          );
        })}
        <div
          ref={(c) => {
            this.scrollTarget = c;
          }}
        />
      </MessagesWrapper>
    );
  }
}
Messages.propTypes = {
  messages: PropTypes.object,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      player: PropTypes.string,
      content: PropTypes.string,
      timestamp: PropTypes.number,
      type: PropTypes.string,
    }),
  ),
  players: PropTypes.object,
  playerKey: PropTypes.string,
  tableKey: PropTypes.string, // for connecting to firebase
  resend: PropTypes.func,
};

export default connect(({ tableKey, playerKey }, ref) => ({
  resend: (text) => {
    // resend a message from this player
    const message = parseInput(text);
    const wholeMessage = {
      ...message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      player: playerKey,
    };
    const messagesRef = ref(`tables/${tableKey}/messages`);
    messagesRef.push(wholeMessage);
  },
  messages: `tables/${tableKey}/messages`,
  players: `tables/${tableKey}/players`,
}))(Messages);
