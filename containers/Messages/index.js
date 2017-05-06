import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import formatDate from 'date-fns/format';
import { connect } from 'react-firebase';

import { colors, sizes } from '../../components/constants';
import Message from '../../components/Message';

const MessagesWrapper = glamorous.div({
  fontSize: sizes.text,
  fontFamily: 'Vulf Mono Light',
  lineHeight: '1.618em',
  overflowY: 'scroll',
  height: '100%',
  padding: '0.5rem 1rem 0',
});

const byTimestamp = (a, b) => a.timestamp - b.timestamp;

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
    const messagesList = this.props.messages
      ? Object.keys(this.props.messages)
          .map(key => ({
            key,
            ...this.props.messages[key],
          }))
          .sort(byTimestamp)
      : [];
    return (
      <MessagesWrapper>
        {messagesList.map((m, i, arr) => {
          const fromPlayer = this.props.players[m.player];
          const MessageHeader = glamorous.div({
            margin: '1rem 0 0',
            fontFamily: 'Vulf Mono Bold',
            color: fromPlayer ? fromPlayer.color : colors.black,
          });
          const isBroadcastedType = ['text', 'roll'].indexOf(m.type) > -1;
          const isRepeatedPlayer = i >= 1 ? m.player === arr[i - 1].player : false;
          const shouldShowHeader = isBroadcastedType && !isRepeatedPlayer;
          return (
            <div key={m.key} title={formatDate(m.timestamp, 'M/D/YY h:mm A')}>
              {shouldShowHeader
                ? <MessageHeader>
                  {fromPlayer.gm ? <span>{'GM '}</span> : null}
                  {fromPlayer.name}
                </MessageHeader>
                : null}
              <Message
                content={m.content}
                players={this.props.players}
                tableKey={this.props.tableKey}
                fromPlayer={fromPlayer}
                playerKey={this.props.playerKey}
                type={m.type}
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
  players: PropTypes.object,
  playerKey: PropTypes.string,
  tableKey: PropTypes.string, // for connecting to firebase
};

export default connect(({ tableKey }) => ({
  messages: `tables/${tableKey}/messages`,
  players: `tables/${tableKey}/players`,
}))(Messages);
