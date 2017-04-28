import { SET_MESSAGES } from '../../constants/actions';

const defaultState = [];

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGES: {
      return payload.messages;
    }
    default:
      return state;
  }
}

export const getMessages = state => Object.keys(state).map(key => state[key]);
