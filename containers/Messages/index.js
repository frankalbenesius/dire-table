import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import formatDate from 'date-fns/format';
import { connect } from 'react-firebase';

import { sizes } from '../../components/constants';
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
          const player = this.props.players[m.player];
          const MessageHeader = glamorous.div({
            margin: '1rem 0 0',
            fontFamily: 'Vulf Mono Bold',
            color: player.color,
          });
          return (
            <div key={m.key} title={formatDate(m.timestamp, 'M/D/YY h:mm A')}>
              {(m.player && i === 0) || arr[i - 1].player !== m.player
                ? <MessageHeader>
                  {player.gm ? <span>{'GM '}</span> : null}
                  {player.name}
                </MessageHeader>
                : null}
              <Message content={m.content} player={player} type={m.type} />
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
  // table: PropTypes.string, connected to firebase
};

export default connect(({ table }) => ({
  messages: `tables/${table}/messages`,
  players: `tables/${table}/players`,
}))(Messages);
