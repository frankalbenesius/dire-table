import React from 'react'

import Area from './Area'

const Areas = ({ areas, mapUtils }) => (
  <g>
    {areas.map((area, i) => (
      <Area
        key={i}
        path={mapUtils.toPath(area)}
      />
    ))}
  </g>
)
Areas.propTypes = {
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  mapUtils: React.PropTypes.shape({
    toPath: React.PropTypes.func,
  }),
}

export default Areas
