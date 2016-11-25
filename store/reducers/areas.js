import { ADD_AREA  } from '../constants/ActionTypes'

const defaultAreas = [
  [
      [[1,1],[1,4],[4,4],[4,2],[4,4],[5,4],[5,3],[7,3],[7,1]],
      [[2,2],[2,3],[3,3],[3,2]],
  ],
];

export default function reducer(state = defaultAreas, action) {
  switch (action.type) {
    case ADD_AREA: return state
    default: return state
  }
}
