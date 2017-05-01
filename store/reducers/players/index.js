import { SET_PLAYER, SET_ROSTER } from '../../constants/actions';

const defaultState = {
  player: null,
  roster: [],
  // roster: {
  //   0: {
  //     id: 0,
  //     active: true,
  //     name: 'GM Fischoeder',
  //   },
  //   1: {
  //     id: 1,
  //     active: false,
  //     name: 'Bob',
  //   },
  //   2: {
  //     id: 2,
  //     active: false,
  //     name: 'Linda',
  //   },
  //   3: {
  //     id: 3,
  //     active: false,
  //     name: 'Tina',
  //   },
  //   4: {
  //     id: 4,
  //     active: false,
  //     name: 'Gene',
  //   },
  //   5: {
  //     id: 5,
  //     active: false,
  //     name: 'Louise',
  //   },
  // },
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PLAYER: {
      return {
        ...state,
        player: payload.id,
      };
    }
    case SET_ROSTER: {
      return {
        ...state,
        roster: payload.roster,
      };
    }
    default:
      return state;
  }
}

export const getRoster = state => state.roster;
export const getPlayer = state => state.roster[state.player];
