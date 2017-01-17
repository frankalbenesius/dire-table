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
    border: `2px solid ${colors.black}`,
    boxShadow: `0 0 ${sizes.shadow} ${colors.black}`,
    fill: '#000',
  }),
}

const Tools = ({ children }) => (
  <div className={styles.wrapper}>
    <div>
      { children }
    </div>
  </div>
)
Tools.propTypes = {
  children: React.PropTypes.node,
}

export default Tools
