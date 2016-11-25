import React from 'react'
import css from 'next/css'

export default () => {
  return (
    <div className={style}>
    </div>
  )
}

const chatWidth = '300px';
const style = css({
  backgroundColor: 'SlateGrey',
  flex: `0 1 ${chatWidth}`,
  '@media(max-width: 850px)': {
    display: 'none',
  },
})
