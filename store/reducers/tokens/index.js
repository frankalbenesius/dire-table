import { SET_TOKENS } from '../../constants/actions';

const defaultState = {};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TOKENS: {
      return payload.tokens;
    }
    default:
      return state;
  }
}

export const getTokens = state => ({
  byId: state,
  list: Object.keys(state).map(key => state[key]),
});
