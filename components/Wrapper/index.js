import React from 'react'
import Head from 'next/head'
import css from 'next/css'

export default (props) => {
  return (
    <div className={style}>
      <Head>
        <link rel='stylesheet' href='static/css/index.css'></link>
      </Head>
      {props.children}
    </div>
  )
}

const style = css({
  height: '100%',
  display: 'flex',
})
