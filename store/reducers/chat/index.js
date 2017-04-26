import { ADD_MESSAGE_TEXT, ADD_MESSAGE_ROLL, ADD_MESSAGE_ERROR } from '../../constants/actions';

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
    case ADD_MESSAGE_TEXT: {
      return [
        ...state,
        {
          player: payload.id,
          timestamp: Date.now(),
          type: 'text',
          content: payload.text,
        },
      ];
    }
    case ADD_MESSAGE_ROLL: {
      return [
        ...state,
        {
          player: payload.id,
          timestamp: Date.now(),
          type: 'roll',
          content: payload.text,
        },
      ];
    }
    case ADD_MESSAGE_ERROR: {
      return [
        ...state,
        {
          player: payload.id,
          timestamp: Date.now(),
          type: 'error',
          content: 'Sorry! That command had a dire error. Try checking the spelling.',
        },
      ];
    }
    default:
      return state;
  }
}
