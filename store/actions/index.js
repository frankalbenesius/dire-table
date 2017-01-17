import * as types from '../actionTypes'

export const moveToken = (id, location) => ({ type: types.MOVE_TOKEN, payload: { id, location } })
export const selectTool = id => ({ type: types.SELECT_TOOL, payload: { id } })
