import React from 'react'
import { style } from 'next/css'
import Icon from '../../components/Icon'
import { colors, sizes } from '../../components/constants'

const styles = {
  wrapper: style({
    display: 'flex',
    position: 'absolute',
    left: '30px',
    top: '30px',
    justifyContent: 'center',
  }),
  tools: style({
    fill: '#000',
    boxShadow: `0 0 ${sizes.shadow} ${colors.black}`,
    backgroundColor: colors.tools,
    border: `2px solid ${colors.black}`,
  }),
  tool: style({
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
  selected: style({
    backgroundColor: colors.selected,
  }),
  icon: style({
    width: '80%',
  }),
}

const Tools = () => (
  <div className={styles.wrapper}>
    <div className={styles.tools}>
      <div className={`${styles.tool} ${styles.selected}`}>
        <Icon icon="smile" />
      </div>
      <div className={styles.tool}>
        <Icon icon="smile" />
      </div>
      <div className={styles.tool}>
        <Icon icon="smile" />
      </div>
      <div className={styles.tool}>
        <Icon icon="smile" />
      </div>
    </div>
  </div>
)

export default Tools
