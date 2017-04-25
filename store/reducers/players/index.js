const defaultState = {
  0: {
    id: 0,
    name: 'GM Fischoeder',
  },
  1: {
    id: 1,
    name: 'Bob',
  },
  2: {
    id: 2,
    name: 'Linda',
  },
  3: {
    id: 3,
    name: 'Tina',
  },
  4: {
    id: 4,
    name: 'Gene',
  },
  5: {
    id: 5,
    name: 'Louise',
  },
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const getPlayers = state => ({
  byId: state,
  list: Object.keys(state).map(key => state[key]),
});
