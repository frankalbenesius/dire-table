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
      <title>Dire Tools: Map</title>
      <link rel="stylesheet" href="static/css/index.css" />
    </Head>
    {children}
  </div>
)
Wrapper.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
}

export default Wrapper
