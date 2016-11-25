import React from 'react'
import Head from 'next/head'
import css from 'next/css'

const style = css({
  height: '100%',
  display: 'flex',
})


const Wrapper = ({ children }) => (
  <div className={style}>
    <Head>
      <link rel="stylesheet" href="static/css/index.css" />
    </Head>
    {children}
  </div>
)
Wrapper.propTypes = {
  children: React.PropTypes.element,
}

export default Wrapper
