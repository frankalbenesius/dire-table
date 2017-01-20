import martinez from 'martinez-polygon-clipping'
import { ADD_AREA } from '../../constants/actions'

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
  const unionWithoutHoles = martinez.union(existingArea[0], newArea[0])
  const holesBeforeMerge = existingArea.slice(1).concat(newArea.slice(1))
  const holesAfterMerge = holesBeforeMerge.map(hole => martinez.diff(hole, newArea))
  const removeHole = (area, hole) => martinez.diff(area, hole)
  return holesAfterMerge.reduce(removeHole, unionWithoutHoles)
}

const defaultAreas = [
  [
    [[-1, -1], [-1, 3], [-3, 3], [-3, -1], [-1, -1]],
  ],
  [
    [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]],
  ],
  merge(areaExisting, areaToBeMerged),
]

export default function reducer(state = defaultAreas, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_AREA: {
      return [...state, payload.area]
    }
    default: return state
  }
}

export const getAreas = state => ([...state])
