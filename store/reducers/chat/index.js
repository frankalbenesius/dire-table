import { SEND_MESSAGE } from '../../constants/actions';

const defaultState = [
  {
    player: 1,
    timestamp: 1483292606475,
    type: 'text',
    content: 'Welcome! This is the "table" tool for Dire.Tools. It is a work in progress!',
  },
  {
    player: 3,
    timestamp: 1483292606478,
    type: 'roll',
    content: 'Test',
  },
  {
    player: 2,
    timestamp: 1483292606478,
    type: 'text',
    content: "Just testing some roll displays, y'all.",
  },
  {
    player: 2,
    timestamp: 1483292606478,
    type: 'roll',
    content: 'Test 2',
  },
];

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE: {
      return [
        ...state,
        {
          player: 0,
          timestamp: Date.now(),
          type: 'text',
          content: payload.text,
        },
      ];
    }
    default:
      return state;
  }
}
