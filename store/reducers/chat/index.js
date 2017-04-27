import { ADD_MESSAGE_TEXT, ADD_MESSAGE_ROLL, ADD_MESSAGE_ERROR } from '../../constants/actions';

const defaultState = [
  {
    player: 1,
    timestamp: 1483292606475,
    type: 'text',
    content: 'Welcome! This is the "table" tool for Dire.Tools. It is a work in progress!',
  },
  {
    player: 2,
    timestamp: 1483292606478,
    type: 'text',
    content: "Just testing some roll displays, y'all.",
  },
  // {
  //   player: 2,
  //   timestamp: 1483292606478,
  //   type: 'roll',
  //   content: {
  //     formula: '2d20 + 4',
  //     evaluation: {
  //       // Operation
  //       type: 'add',
  //       left: {
  //         // Roll
  //         count: 2,
  //         sides: 20,
  //         results: [9, 6],
  //         value: 15,
  //       },
  //       right: {
  //         // Num
  //         value: 4,
  //       },
  //       value: 19,
  //     },
  //   },
  // },
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
          content: {
            formula: payload.formula,
            evaluation: payload.evaluation,
            value: payload.value,
          },
        },
      ];
    }
    case ADD_MESSAGE_ERROR:
      // TODO: Display some error message
      // https://trello.com/c/IugoYRSk
      console.warn('An error occured sending the message.'); // eslint-disable-line
      return state;
    default:
      return state;
  }
}
