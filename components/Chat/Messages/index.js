import React from 'react'
import { style } from 'next/css'
import { sizes } from '../../constants'
import Message from './Message'

const styles = {
  messages: style({
    fontSize: sizes.text,
    fontFamily: 'Vulf Mono Regular',
    padding: '1rem',
  }),
}

const byTimestamp = (a, b) => a.timestamp - b.timestamp

const Messages = ({ messages }) => (
  <div className={styles.messages}>
    {
      messages.sort(byTimestamp).map((m, i, arr) => (
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
  </div>
)
Messages.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default Messages
