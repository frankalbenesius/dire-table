import { SELECT_TOOL } from '../../actionTypes'

const options = {
  cursor: {
    id: 'cursor',
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

const defaultToolId = options.cursor.id
export default function reducer(state = defaultToolId, action) {
  const { type, payload } = action
  switch (type) {
    case SELECT_TOOL: {
      return payload.id
    }
    default: return state
  }
}

export const getTool = state => state
