import React from 'react'
import css from 'next/css'
import { colors, sizes, zIndexes } from '../constants'

const style = css({
  backgroundColor: colors.chat,
  flex: `0 1 ${sizes.chatWidth}`,
  zIndex: zIndexes.chat,
  boxShadow: `0 0 ${sizes.shadow} ${colors.shadow}`,
  '@media(max-width: 850px)': {
    display: 'none',
  },
})

export default () => (
  <div className={style} />
)
