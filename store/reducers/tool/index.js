import { SELECT_TOOL } from '../../constants/actions';

const options = {
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    icon: 'pointerUp',
  },
  token: {
    id: 'token',
    name: 'Add Token',
    icon: 'plusCircle',
  },
  add: {
    id: 'add',
    name: 'Add Area',
    icon: 'combine',
  },
  remove: {
    id: 'remove',
    name: 'Remove Area',
    icon: 'subtract',
  },
};
export const tools = Object.keys(options).map(o => options[o]);

const defaultToolId = {
  toolId: options.cursor.id,
  newTokenPlayerId: '',
};

export default function reducer(state = defaultToolId, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_TOOL: {
      return {
        ...state,
        toolId: payload.id,
        newTokenPlayerId: payload.newTokenPlayerId,
      };
    }
    default:
      return state;
  }
}

export const getCurrentToolId = state => state.toolId;
export const getNewTokenPlayerId = state => state.newTokenPlayerId;
