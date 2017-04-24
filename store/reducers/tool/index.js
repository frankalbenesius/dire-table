import { SELECT_TOOL } from '../../constants/actions';

const options = {
  cursor: {
    id: 'cursor',
    icon: 'pointerUp',
  },
  token: {
    id: 'token',
    icon: 'plusCircle',
  },
  add: {
    id: 'add',
    icon: 'combine',
  },
  remove: {
    id: 'remove',
    icon: 'subtract',
  },
};
export const tools = Object.keys(options).map(o => options[o]);

const defaultToolId = options.cursor.id;
export default function reducer(state = defaultToolId, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_TOOL: {
      return payload.id;
    }
    default:
      return state;
  }
}

export const getTool = state => state;
