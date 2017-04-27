import { max, omit } from 'lodash';
import { ADD_TOKEN, REMOVE_TOKEN, MOVE_TOKEN } from '../../constants/actions';

const defaultState = {
  // 0: {
  //   id: 0,
  //   player: 0, // either id or none? can determine if PC or NPC from this
  //   icon: 'sad', // <svg class="lnr lnr-mustache"><use xlink:href="#lnr-mustache"></use></svg>
  //   location: { x: 3.5, y: 3.5 }, // center of circle
  //   size: 1, // diameter of token by cell count
  //   lastUpdated: 1484803641888,
  // },
  // 1: {
  //   id: 1,
  //   player: 1,
  //   icon: 'mustache',
  //   location: { x: -0.5, y: 3.5 },
  //   size: 3,
  //   lastUpdated: 1484803641889,
  // },
  // 2: {
  //   id: 2,
  //   player: 4,
  //   icon: 'neutral',
  //   location: { x: -3.5, y: 5.5 },
  //   size: 1,
  //   lastUpdated: 1484803641890,
  // },
  // 3: {
  //   id: 3,
  //   player: 3,
  //   icon: 'smile',
  //   location: { x: 4, y: 1 },
  //   size: 2,
  //   lastUpdated: 1484803641891,
  // },
  // 4: {
  //   id: 4,
  //   player: 2,
  //   icon: 'smile',
  //   location: { x: 0.5, y: -0.5 },
  //   size: 1,
  //   lastUpdated: 1484803641894,
  // },
  // 5: {
  //   id: 5,
  //   player: 5,
  //   icon: 'smile',
  //   location: { x: -2.5, y: -0.5 },
  //   size: 1,
  //   lastUpdated: 1484803641895,
  // },
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TOKEN: {
      const id = max(Object.keys(state).map(x => parseInt(x, 10))) + 1 || 0;
      return {
        ...state,
        [id]: {
          id,
          player: payload.id,
          icon: 'smile',
          location: payload.location,
          size: 1,
          lastUpdated: Date.now(),
        },
      };
    }
    case REMOVE_TOKEN:
      return omit(state, payload.id);
    case MOVE_TOKEN: {
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          location: payload.location,
          lastUpdated: Date.now(),
        },
      };
    }
    default:
      return state;
  }
}

export const getTokens = state => ({
  byId: state,
  list: Object.keys(state).map(key => state[key]),
});
