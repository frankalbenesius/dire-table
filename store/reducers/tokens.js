const defaultState = [
  {
    player: 0, // either id or none? can determine if PC or NPC from this
    icon: 'sad', // <svg class="lnr lnr-mustache"><use xlink:href="#lnr-mustache"></use></svg>
    location: [1.5, 1.5], // center of circle
    size: 1, // diameter of token by cell count
  },
  {
    player: 0, // player id 0 denotes GM token
    icon: 'smile',
    location: [-1.5, 0.5],
    size: 1,
  },
  {
    player: 1,
    icon: 'mustache',
    location: [-0.5, 3.5],
    size: 1,
  },
  {
    player: 2,
    icon: 'neutral',
    location: [0.5, 3.5],
    size: 1,
  },
  {
    player: 3,
    icon: 'mustache',
    location: [1.5, 3.5],
    size: 1,
  },
  {
    player: 4,
    icon: 'mustache',
    location: [4.5, 1.5],
    size: 1,
  },
  {
    player: 5,
    icon: 'mustache',
    location: [3.5, 3.5],
    size: 1,
  },
  {
    player: 6,
    icon: 'mustache',
    location: [4.5, 3.5],
    size: 1,
  },
  {
    player: 0,
    icon: 'mustache',
    location: [5, 2],
    size: 2,
  },
]

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    default: return state
  }
}
