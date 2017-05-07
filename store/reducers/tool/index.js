import { SELECT_TOOL } from '../../constants/actions';

const options = {
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    icon: 'pointerUp',
    info: ['Move tokens on the board.', 'Shift-click tokens to remove them.'],
  },
  token: {
    id: 'token',
    name: 'Add Token',
    icon: 'plusCircle',
    info: ['Place an NPC token.', 'Place player tokens by clicking their name in the player list.'],
  },
  add: {
    id: 'add',
    name: 'Add Area',
    icon: 'combine',
    info: ['Drag to add areas.', 'Areas merge on overlap.'],
  },
  remove: {
    id: 'remove',
    name: 'Remove Area',
    icon: 'subtract',
    info: ['Drag to remove areas.', 'Can create walls & holes.'],
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
