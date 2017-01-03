import React from 'react'
import { style } from 'next/css'
import { padEnd } from 'lodash'
import formatDate from 'date-fns/format'
import { colors } from '../../../constants'

const styles = {
  message: style({
    margin: '0.5rem 0',
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
  margin: '1em 0',
})

const Roll = () => (
  <div className={styles.roll}>Dice Roll Display TBD</div>
)

const Message = ({ showHeader, content, player, timestamp, type }) => (
  <div title={formatDate(timestamp, 'M/D/YY h:mm A')} className={styles.message}>
    {
      showHeader ? (
        <div className={playerHeaderStyles(player)}>{padEnd(` Player ${player} `, 30, '-')}</div>
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
