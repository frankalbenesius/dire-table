const defaultState = [
  {
    player: 1, // either id or none? can determine if PC or NPC from this
    icon: 'earth', // <svg class="lnr lnr-mustache"><use xlink:href="#lnr-mustache"></use></svg>
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
    player: 2,
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
