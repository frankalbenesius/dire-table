import React from 'react'
import { style } from 'next/css'
import { colors } from '../../../constants'

const styles = {
  message: style({
    marginTop: '1rem',
  }),
}

const playerHeaderStyles = i => style({
  color: colors.player[i],
  marginBottom: '0.5em',
})

const Message = ({ content, player, timestamp, type }) => (
  <div className={styles.message}>
    <div className={playerHeaderStyles(player)}>Player {player}</div>
    {
      type === 'text' ? (
        <div>{content}</div>
      ) : (
        <div>Roll content...</div>
      )
    }
    <div>{timestamp}</div>
    <div>{type}</div>
  </div>
)
Message.propTypes = {
  content: React.PropTypes.any, //eslint-disable-line
  player: React.PropTypes.number,
  timestamp: React.PropTypes.number,
  type: React.PropTypes.string,
}

export default Message
