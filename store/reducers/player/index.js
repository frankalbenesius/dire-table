const defaultState = {
  id: 0,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const getPlayer = state => ({ ...state });
