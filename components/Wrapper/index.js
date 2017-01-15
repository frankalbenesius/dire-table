import React from 'react'
import { style } from 'next/css'

const styles = style({
  height: '100%',
  display: 'flex',
})

const Wrapper = ({ children }) => (
  <div className={styles}>
    {children}
  </div>
)
Wrapper.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
}

export default Wrapper
