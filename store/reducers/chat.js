const defaultState = [
  {
    player: 1,
    timestamp: 1483292606475,
    type: 'text',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque libero sit amet leo placerat, sed dignissim nisi blandit. Nunc dictum ligula in faucibus tincidunt. Quisque ornare eu magna sed semper. Maecenas mi nunc, semper ut sapien sit amet, imperdiet feugiat enim. Ut sed massa est.',
  },
  {
    player: 2,
    timestamp: 1483293078527,
    type: 'roll',
    content: {
      source: '2d6 + 4',
      result: 11,
      rolls: [
        {
          roll: '2d6',
          result: [3, 4],
        },
        {
          roll: null,
          result: [4],
        },
      ],
    },
  },
  {
    player: 0,
    timestamp: 1483293100183,
    type: 'text',
    content: 'Nulla ac sagittis felis, mollis commodo massa.',
  },
  {
    player: 4,
    timestamp: 1483292606475,
    type: 'text',
    content: 'Suspendisse congue tincidunt nibh nec pretium. Maecenas molestie scelerisque nisi tincidunt suscipit. Nam ligula quam, eleifend at mattis sit amet, pulvinar finibus nunc. Nullam lacinia ullamcorper est eget vestibulum. Praesent eu mollis ante. Mauris facilisis congue malesuada. Morbi et lobortis libero.',
  },
  {
    player: 3,
    timestamp: 1483292606475,
    type: 'text',
    content: 'Praesent pulvinar magna quis sapien suscipit egestas. In sit amet porta erat. Duis convallis aliquam nisi eget molestie. Donec nec nisl purus.',
  },
]

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default: return state
  }
}
