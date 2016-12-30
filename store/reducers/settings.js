// import { ADD_AREA  } from '../constants/ActionTypes'

const defaultState = {
  cellSize: 74, // for zooming controls
  boardSize: 30, // for expanding map
  fogOpacity: 1, // replace with playerType and have it determine opacity
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    // case ADD_AREA: return state
    default: return state
  }
}
