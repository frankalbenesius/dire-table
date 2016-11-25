import React from 'react'
import css from 'next/css'

const chatWidth = '300px'
const style = css({
  backgroundColor: 'SlateGrey',
  flex: `0 1 ${chatWidth}`,
  '@media(max-width: 850px)': {
    display: 'none',
  },
})

export default () => (
  <div className={style} />
)
