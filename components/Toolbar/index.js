import React from 'react'
import { css } from 'next/css'

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

const Tools = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.tools}>
      { children }
    </div>
  </div>
)
Tools.propTypes = {
  children: React.PropTypes.node,
}

export default Tools
