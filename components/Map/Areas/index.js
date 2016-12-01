import React from 'react'

import Area from './Area'

const Areas = ({ paths }) => (
  <g>
    {paths.map((path, i) => (
      <Area
        key={i}
        path={path}
      />
    ))}
  </g>
)
Areas.propTypes = {
  paths: React.PropTypes.arrayOf(React.PropTypes.string),
}

export default Areas
