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

const Messages = ({ messages }) => (
  <div className={styles.messages}>
    {
        messages.map((m, i) => (
          <Message key={i} {...m} />
        ))
      }
  </div>
)
Messages.propTypes = {
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default Messages
