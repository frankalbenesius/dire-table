const defaultState = {
  squarePx: 74, // for zooming controls
  size: 30, // for expanding map
  fogOpacity: 1, // replace with playerType and have it determine opacity
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const getBoard = (state) => {
  const boardPx = state.squarePx * state.size + 1;
  return {
    ...state,
    boardPx,
    centerPx: boardPx / 2,
  };
};
