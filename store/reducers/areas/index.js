import { SET_AREAS } from '../../constants/actions';
// import { mergeArea, removeArea } from '../../../util/areas';

const defaultAreas = [];
export default function reducer(state = defaultAreas, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AREAS:
      return payload.areas;
    // case ADD_AREA: {
    //   const resultingAreas = mergeArea(state, payload.area);
    //   firebase.database().ref('/areas').set(resultingAreas);
    //   return resultingAreas;
    // }
    // case REMOVE_AREA: {
    //   const resultingAreas = removeArea(state, payload.area);
    //   firebase.database().ref('/areas').set(resultingAreas);
    //   return resultingAreas;
    // }
    default:
      return state;
  }
}

export const getAreas = state => [...state];
