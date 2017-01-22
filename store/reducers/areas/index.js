import clipper from 'js-clipper' // clipping library
import { ADD_AREA } from '../../constants/actions'

// failed libraries:
// "greiner-hormann": "^1.3.1",
// "martinez-polygon-clipping": "^0.1.5",
// "2d-polygon-boolean"

// const iA = [
//   [[-2, -2], [-2, 2], [2, 2], [2, -2], [-2, -2]],
//   [[-1, -1], [-1, 0], [0, 0], [0, -1], [-1, -1]],
// ]
// const iB = [
//   [[1, 1], [1, 5], [5, 5], [5, 1], [1, 1]],
//   [[3, 3], [3, 4], [4, 4], [4, 3]],
//   [[2, 2], [2, 3], [3, 3], [3, 2]],
// ]

const assimilateArea = (areas, newArea) => [...areas, newArea]

const defaultAreas = []
export default function reducer(state = defaultAreas, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_AREA: return assimilateArea(state, payload.area)
    default: return state
  }
}

export const getAreas = state => ([...state])
