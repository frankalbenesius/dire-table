import React from 'react'
import { css } from 'next/css'

import Icon from '../Icon'
import { colors } from '../constants'

const styles = {
  tool: css({
    padding: '5px',
    fill: colors.black,
    width: '50px',
    height: '50px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `2px solid ${colors.black}`,
    ':last-child': {
      borderBottom: '0',
    },
    ':hover': {
      backgroundColor: colors.selected,
      cursor: 'pointer',
    },
  }),
  selected: css({
    backgroundColor: colors.selected,
  }),
}

const Tools = () => (
  <div className={`${styles.tool}`}>
    <Icon icon="smile" />
  </div>
)

export default Tools
