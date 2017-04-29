import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import { sizes } from '../constants';
import Message from './Message';

const styles = {
  messages: style({
    fontSize: sizes.text,
    fontFamily: 'Vulf Mono Light',
    lineHeight: '1.618em',
    overflowY: 'scroll',
    height: '100%',
    padding: '0 1rem',
  }),
  scrollTarget: style({}),
};

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
    return (
      <div className={styles.messages}>
        {this.props.messages
          .sort(byTimestamp)
          .map((m, i, arr) => (
            <Message
              key={i}
              showHeader={i === 0 || arr[i - 1].player !== m.player}
              content={m.content}
              player={this.props.roster[m.player]}
              timestamp={m.timestamp}
              type={m.type}
            />
          ))}
        <div
          className={styles.scrollTarget}
          ref={(c) => {
            this.scrollTarget = c;
          }}
        />
      </div>
    );
  }
}
Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  roster: PropTypes.object,
};

export default Messages;
