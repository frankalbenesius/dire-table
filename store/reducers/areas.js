import { ADD_AREA } from '../constants/ActionTypes'

const defaultAreas = [
  [
      [[1, 1], [1, 4], [4, 4], [4, 2], [4, 4], [5, 4], [5, 3], [7, 3], [7, 1]],
      [[2, 2], [2, 3], [3, 3], [3, 2]],
  ],
  [
      [[-1, -1], [-1, 3], [-3, 3], [-3, -1]],
  ],
  [
      [[0, -3], [-1, -3], [-1, 5], [0, 5]],
  ],
  [
      [[0, 0], [0, 6], [1, 6], [1, 0]],
  ],
  [
      [[0, 0], [2, 0], [2, 1], [5, 1], [5, -4], [3, -4], [3, -2], [3, -5], [0, -5]],
      [[1, -1], [2, -1], [2, -3], [1, -3]],
  ],
]

export default function reducer(state = defaultAreas, action) {
  switch (action.type) {
    case ADD_AREA: return state
    default: return state
  }
}
