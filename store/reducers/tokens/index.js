import { MOVE_TOKEN } from '../../actionTypes'

const defaultState = {
  0: {
    id: 0,
    player: 0, // either id or none? can determine if PC or NPC from this
    icon: 'sad', // <svg class="lnr lnr-mustache"><use xlink:href="#lnr-mustache"></use></svg>
    location: [1.5, 1.5], // center of circle
    size: 1, // diameter of token by cell count
  },
  1: {
    id: 1,
    player: 1,
    icon: 'mustache',
    location: [-0.5, 3.5],
    size: 1,
  },
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case MOVE_TOKEN: {
      return state
    }
    default: return state
  }
}
