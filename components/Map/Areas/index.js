import React from 'react'

import Area from './Area'

const Areas = ({ centerPx, areas, cellSize }) => (
  <g>
    {areas.map((coords, i) => (
      <Area
        key={i}
        coords={coords}
        centerPx={centerPx}
        cellSize={cellSize}
      />
    ))}
  </g>
)
Areas.propTypes = {
  centerPx: React.PropTypes.number,
  cellSize: React.PropTypes.number,
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
}

export default Areas
