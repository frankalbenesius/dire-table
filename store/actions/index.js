import * as types from '../constants/actions';

export const selectTool = (id, newTokenPlayerId = '') => {
  console.log('id', id);
  console.log('newTokenPlayerId', newTokenPlayerId);
  return {
    type: types.SELECT_TOOL,
    payload: {
      id,
      newTokenPlayerId,
    },
  };
};

export const setPlayer = id => ({ type: types.SET_PLAYER, payload: { id } });
export const setRoster = roster => ({ type: types.SET_ROSTER, payload: { roster } });
export const setTokens = tokens => ({ type: types.SET_TOKENS, payload: { tokens } });
export const setAreas = areas => ({ type: types.SET_AREAS, payload: { areas } });
export const setMessages = messages => ({ type: types.SET_MESSAGES, payload: { messages } });
