// import { ADD_AREA  } from '../constants/ActionTypes'

const defaultState = {
  cellSize: 74,
  boardSize: 30,
  fogOpacity: 0.75,
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    // case ADD_AREA: return state
    default: return state
  }
}
