import React from 'react'
import { css } from 'next/css'

import ToolbarOption from '../ToolbarOption'
import { colors, sizes } from '../constants'

const styles = {
  wrapper: css({
    display: 'flex',
    position: 'absolute',
    left: '30px',
    top: '30px',
    justifyContent: 'center',
  }),
  tools: css({
    fill: '#000',
    boxShadow: `0 0 ${sizes.shadow} ${colors.black}`,
    backgroundColor: colors.tools,
    border: `2px solid ${colors.black}`,
  }),
}

const Tools = () => (
  <div className={styles.wrapper}>
    <div className={styles.tools}>
      <ToolbarOption />
      <ToolbarOption />
      <ToolbarOption />
      <ToolbarOption />
    </div>
  </div>
)

export default Tools
