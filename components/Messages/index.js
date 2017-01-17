import React from 'react'
import { style } from 'next/css'
import { sizes } from '../constants'
import Message from './Message'

const styles = {
  messages: style({
    fontSize: sizes.text,
    fontFamily: 'Vulf Mono Light',
    lineHeight: '1.618em',
    padding: '0 1rem',
    overflowY: 'scroll',
    height: '100%',
  }),
}

const byTimestamp = (a, b) => a.timestamp - b.timestamp

class Messages extends React.Component {
  componentDidMount() {
    this.scrollTarget.scrollIntoView()
  }
  componentDidUpdate() {
    this.scrollTarget.scrollIntoView()
  }
  render() {
    return (
      <div ref={(c) => { this.messagesBox = c }} className={styles.messages}>
        {
          this.props.messages.sort(byTimestamp).map((m, i, arr) => (
            <Message
              key={i}
              showHeader={i === 0 || arr[i - 1].player !== m.player}
              content={m.content}
              player={m.player}
              timestamp={m.timestamp}
              type={m.type}
            />
          ))
        }
        <span ref={(c) => { this.scrollTarget = c }} />
      </div>
    )
  }
}
Messages.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default Messages
