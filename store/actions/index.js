import * as types from '../constants/actions';

export const moveToken = (id, location) => ({
  type: types.MOVE_TOKEN,
  payload: { id, location },
});
export const selectTool = id => ({ type: types.SELECT_TOOL, payload: { id } });
export const addToken = location => ({
  type: types.ADD_TOKEN,
  payload: { location },
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
