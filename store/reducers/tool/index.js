import { SELECT_TOOL } from '../../constants/actions';

const options = {
  cursor: {
    id: 'cursor',
    icon: 'pointerUp',
  },
  // token: {
  //   id: 'token',
  //   icon: 'plusCircle',
  // },
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

const defaultToolId = {
  toolId: options.cursor.id,
  tokenIdToAdd: 0,
};

export default function reducer(state = defaultToolId, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_TOOL: {
      return {
        ...state,
        toolId: payload.id,
        tokenIdToAdd: payload.tokenIdToAdd,
      };
    }
    default:
      return state;
  }
}

export const getCurrentToolId = state => state.toolId;
export const getTokenIdToAdd = state => state.tokenIdToAdd;
