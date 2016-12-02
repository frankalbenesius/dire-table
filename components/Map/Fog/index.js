import React from 'react'
// import css from 'next/css'
import { style, keyframes } from 'next/css'
import { colors } from './../../../components/constants'

const dashLength = 10
const dashedAnimation = keyframes({
  '0%': { strokeDashoffset: 0 },
  '100%': { strokeDashoffset: dashLength * 2 },
})
const styles = {
  dashedPath: style({
    animation: `${dashedAnimation} 1.5s linear forwards infinite`,
  }),
}

const Fog = ({ path, fogOpacity }) => (
  <g>
    <defs>
      <mask id="fogWindow">
        <rect
          id="fog"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#fff"
          mask="url(#fogWindow)"
        />
        <path
          className={styles.dashedPath}
          d={path}
          fill="#000"
          stroke="#000"
          strokeWidth="4"
          strokeDasharray={dashLength}
        />
      </mask>
    </defs>
    <rect
      id="fog"
      x="0"
      y="0"
      width="100%"
      height="100%"
      opacity={fogOpacity}
      fill={colors.fog}
      mask="url(#fogWindow)"
    />
  </g>
)

Fog.propTypes = {
  fogOpacity: React.PropTypes.number,
  path: React.PropTypes.string,
}

export default Fog
