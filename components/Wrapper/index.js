import React from 'react'
import Head from 'next/head'
import { style } from 'next/css'

const styles = style({
  height: '100%',
  display: 'flex',
})

const Wrapper = ({ children }) => (
  <div className={styles}>
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
