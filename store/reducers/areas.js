import m from 'martinez-polygon-clipping'
import { ADD_AREA } from '../constants/ActionTypes'

const areaExisting = [
  [[-5, 8], [-2, 8], [-2, 5], [-5, 5], [-5, 8]],
  [[-4, 6], [-4, 7], [-3, 7], [-3, 6], [-4, 6]],
]
const areaToBeMerged = [
  [[-4, 7], [-2, 7], [-2, 4], [-4, 4], [-4, 7]],
]

// early merge concept:
// adds newArea (no holes due to tool simplicity) to one existing area
// TODO: figure out how to merge over many areas
//   filter all areas by if they overlap with new area and merge new area with all of them
//   for all overlapped areas, merge newArea in them one by one,
//   replacing "newArea" with newly merged areas
const merge = (existingArea, newArea) => {
  const unionWithoutHoles = m.union(existingArea[0], newArea[0])
  const holesBeforeMerge = existingArea.slice(1).concat(newArea.slice(1))
  const holesAfterMerge = holesBeforeMerge.map(hole => m.diff(hole, newArea))
  const removeHole = (area, hole) => m.diff(area, hole)
  return holesAfterMerge.reduce(removeHole, unionWithoutHoles)
}

const defaultAreas = [
  merge(
    [
      [[-1, 0], [-1, 6], [2, 6], [2, 0], [-1, 0]],
      [[0, 1], [0, 2], [1, 2], [1, 1], [0, 1]],
      [[0, 3], [0, 2], [1, 2], [1, 3], [0, 3]],
    ],
    [
      [[1, 1], [1, 4], [5, 4], [5, 3], [7, 3], [7, 1], [1, 1]],
      [[2, 2], [2, 3], [3, 3], [3, 2], [2, 2]],
    ],
  ),
  [
    [[-1, -1], [-1, 3], [-3, 3], [-3, -1], [-1, -1]],
  ],
  [
    [[0, -3], [-1, -3], [-1, 0], [0, 0], [0, -3]],
  ],
  [
    [[0, 0], [2, 0], [2, 1], [5, 1], [5, -4], [3, -4], [3, -2], [3, -5], [0, -5], [0, 0]],
    [[1, -1], [2, -1], [2, -3], [1, -3], [1, -1]],
    [[3, 0], [4, 0], [4, -1], [3, -1], [3, 0]],
  ],
  merge(areaExisting, areaToBeMerged),
]

export default function reducer(state = defaultAreas, action) {
  switch (action.type) {
    case ADD_AREA: return state
    default: return state
  }
}
