import roller from 'rpgdicejs';
import trim from 'lodash/trim';

import * as types from '../constants/actions';

export const moveToken = (id, location) => ({
  type: types.MOVE_TOKEN,
  payload: { id, location },
});
export const selectTool = (id, tokenIdToAdd = 0) => ({
  type: types.SELECT_TOOL,
  payload: {
    id,
    tokenIdToAdd,
  },
});
export const addToken = (location, id) => ({
  type: types.ADD_TOKEN,
  payload: { location, id },
});
export const removeToken = id => ({
  type: types.REMOVE_TOKEN,
  payload: { id },
});
export const addArea = area => ({ type: types.ADD_AREA, payload: { area } });
export const removeArea = area => ({
  type: types.REMOVE_AREA,
  payload: { area },
});

export const sendMessage = (id, text) => {
  const commandRegex = /\/([a-zA-Z]+)( .*)?/g; // matches /letters and optional argument
  const match = commandRegex.exec(text);
  if (match) {
    const command = match[1];
    const argument = match[2] ? trim(match[2]) : ''; // get rid of leading whitespace
    if ((command === 'roll' || command === 'r') && argument) {
      try {
        const result = roller.eval(argument);
        // console.log(evaluatedRoll.render());
        return {
          type: types.ADD_MESSAGE_ROLL,
          payload: {
            id,
            formula: argument,
            evaluation: result.render(),
            value: result.value,
          },
        };
      } catch (e) {
        // Error: failed to parse roll
        return {
          id,
          type: types.ADD_MESSAGE_ERROR,
        };
      }
    }
    // Error: command doesn't exist
    return {
      id,
      type: types.ADD_MESSAGE_ERROR,
    };
  }
  return {
    type: types.ADD_MESSAGE_TEXT,
    payload: { id, text },
  };
};
