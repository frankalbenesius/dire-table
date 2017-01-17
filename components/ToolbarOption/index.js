import React from 'react'
import { css } from 'next/css'

import Icon from '../Icon'
import { colors } from '../constants'

const toolStyles = {
  padding: '5px',
  fill: '#000',
  width: '50px',
  height: '50px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTop: '0',
  borderLeft: '0',
  borderRight: '0',
  borderBottom: `2px solid ${colors.black}`,
  outline: '0',
  ':last-child': {
    borderBottom: '0',
  },
  ':hover': {
    backgroundColor: colors.selected,
    cursor: 'pointer',
  },
}
const styles = {
  tool: css({
    ...toolStyles,
  }),
  selected: css({
    ...toolStyles,
    backgroundColor: colors.selected,
  }),
}

const Tools = ({ icon, onClick, selected }) => (
  <button className={selected ? styles.selected : styles.tool} onClick={onClick}>
    <Icon icon={icon} />
  </button>
)
Tools.propTypes = {
  selected: React.PropTypes.bool,
  icon: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

export default Tools
