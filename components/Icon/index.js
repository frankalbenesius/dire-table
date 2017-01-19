/* eslint-disable max-len */
import React from 'react'
import { style } from 'next/css'
import iconPaths from './icons'

const styles = style({
  width: '100%',
})

const Icon = ({ icon = 'neutral' }) => (
  <svg className={styles} viewBox="0 1 19 19">{iconPaths[icon]}</svg>
)
Icon.propTypes = {
  icon: React.PropTypes.string,
}

export default Icon
