import { ADD_AREA, REMOVE_AREA } from '../../constants/actions';
import { mergeArea, removeArea } from '../../../utilities/map';

const defaultAreas = [
  [
    [
      {
        x: 2.001,
        y: 5.999,
      },
      {
        x: 2.001,
        y: 0.001,
      },
      {
        x: 3.001,
        y: 0.001,
      },
      {
        x: 3.001,
        y: -1.001,
      },
      {
        x: -2.001,
        y: -1.001,
      },
      {
        x: -2.001,
        y: 1.001,
      },
      {
        x: 0.001,
        y: 1.001,
      },
      {
        x: 0.001,
        y: 0.999,
      },
      {
        x: -0.999,
        y: 0.999,
      },
      {
        x: -0.999,
        y: -0.999,
      },
      {
        x: 0.999,
        y: -0.999,
      },
      {
        x: 0.999,
        y: 1.001,
      },
      {
        x: 1.999,
        y: 1.001,
      },
      {
        x: 1.999,
        y: 6.999,
      },
      {
        x: -4.999,
        y: 6.999,
      },
      {
        x: -4.999,
        y: 1.001,
      },
      {
        x: -2.999,
        y: 1.001,
      },
      {
        x: -2.999,
        y: -1.999,
      },
      {
        x: 5.999,
        y: -1.999,
      },
      {
        x: 5.999,
        y: 5.999,
      },
    ],
  ],
];
export default function reducer(state = defaultAreas, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_AREA:
      return mergeArea(state, payload.area);
    case REMOVE_AREA:
      return removeArea(state, payload.area);
    default:
      return state;
  }
}

export const getAreas = state => [...state];
