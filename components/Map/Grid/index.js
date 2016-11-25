import React from 'react'

const gridPath = cellSize => [
  'M', cellSize, 0,
  'L', 0, 0,
  'L', 0, cellSize,
].join(' ')

const Grid = ({ cellSize }) => (
  <g>
    <defs>
      <pattern id="gridPattern" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
        <path
          d={gridPath(cellSize)}
          fill="none"
          stroke="#000"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
      </pattern>
    </defs>
    <rect id="grid" width="100%" height="100%" fill="url(#gridPattern)" />
  </g>
)
Grid.propTypes = {
  cellSize: React.ProptTypes.number,
}

export default Grid
