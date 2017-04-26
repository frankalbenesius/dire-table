import { SEND_MESSAGE } from '../../constants/actions';

const defaultState = [
  {
    player: 1,
    timestamp: 1483292606475,
    type: 'text',
    content: 'Welcome to Dire.Tools! This is a work in progress, but feel free to experiment with the mapping tools!',
  },
  // {
  //   player: 2,
  //   timestamp: 1483293078527,
  //   type: 'roll',
  //   content: {
  //     source: '2d6 + 4',
  //     result: 11,
  //     rolls: [
  //       {
  //         roll: '2d6',
  //         result: [3, 4],
  //       },
  //       {
  //         roll: null,
  //         result: [4],
  //       },
  //     ],
  //   },
  // },
  {
    player: 0,
    timestamp: 1483293078520,
    type: 'text',
    content: 'This app is being built to provide online tabletop RPG players with a simpler alternative to existing products.',
  },
  {
    player: 2,
    timestamp: 1483293078521,
    type: 'text',
    content: 'This app is being built to provide online tabletop RPG players with a simpler alternative to existing products.',
  },
  {
    player: 5,
    timestamp: 1483293100182,
    type: 'text',
    content: 'It is being built with React, Redux, Next.js, Glamor, and uses Now for hosting.',
  },
  {
    player: 4,
    timestamp: 1483293100183,
    type: 'text',
    content: 'The ability to modify existing tokens and create game sessions is coming soon! Please feel free to contact frankalbenesius@gmail.com with feedback or friendly conversation.',
  },
  {
    player: 3,
    timestamp: 1483408020976,
    type: 'text',
    content: 'Also, this very neat font is called "Vulf Mono". It\'s delightful.',
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
