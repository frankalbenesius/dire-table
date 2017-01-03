import React from 'react'
import { style } from 'next/css'
import { colors } from '../../../constants'

const styles = {
  message: style({
    marginTop: '0.5rem',
  }),
  roll: style({
    padding: '1rem',
    color: colors.black,
    textAlign: 'center',
    borderColor: colors.fog,
    borderWidth: '1px',
    borderStyle: 'solid',
  }),
}

const playerHeaderStyles = i => style({
  color: colors.player[i],
  margin: '1em 0 0.5em',
})

const Roll = () => (
  <div className={styles.roll}>Dice Roll Display TBD</div>
)

const Message = ({ showHeader, content, player, timestamp, type }) => (
  <div className={styles.message}>
    {
      showHeader ? (
        <div className={playerHeaderStyles(player)}>Player {player}</div>
      ) : null
    }

    {
      type === 'text' ? (
        <div>{content}</div>
      ) : (
        <Roll />
      )
    }
  </div>
)
Message.propTypes = {
  showHeader: React.PropTypes.bool,
  content: React.PropTypes.any, //eslint-disable-line
  player: React.PropTypes.number,
  timestamp: React.PropTypes.number,
  type: React.PropTypes.string,
}

export default Message
