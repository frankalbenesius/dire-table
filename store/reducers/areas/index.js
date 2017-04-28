import { SET_AREAS } from '../../constants/actions';

const defaultAreas = [];
export default function reducer(state = defaultAreas, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AREAS: {
      return payload.areas;
    }
    default:
      return state;
  }
}

export const getAreas = state => [...state];
