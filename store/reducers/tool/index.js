import { SELECT_TOOL } from '../../actionTypes'

const options = {
  hand: {
    id: 'hand',
    icon: 'smile',
  },
  token: {
    id: 'token',
    icon: 'neutral',
  },
  add: {
    id: 'add',
    icon: 'sad',
  },
  remove: {
    id: 'remove',
    icon: 'mustache',
  },
}
export const tools = Object.keys(options).map(o => options[o])

export default function reducer(state = options.hand.id, action) {
  const { type, payload } = action
  switch (type) {
    case SELECT_TOOL: {
      return payload.id
    }
    default: return state
  }
}
