import React from 'react'
import { style } from 'next/css'
import { colors, sizes, zIndexes } from '../../constants'

const styles = {
  wrapper: style({
    backgroundColor: colors.chat,
    flex: `0 1 ${sizes.chatWidth}`,
    zIndex: zIndexes.chat,
    boxShadow: `0 0 ${sizes.shadow} ${colors.black}`,
    '@media(max-width: 850px)': {
      display: 'none',
    },
  }),
}

const Wrapper = ({ children }) => (
  <div className={styles.wrapper}>
    { children }
  </div>
)
Wrapper.propTypes = {
  children: React.PropTypes.any, //eslint-disable-line
}

export default Wrapper
