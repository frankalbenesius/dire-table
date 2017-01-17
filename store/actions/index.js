import * as types from '../actionTypes'

export const moveToken = () => ({ type: types.MOVE_TOKEN })
export const selectTool = id => ({ type: types.SELECT_TOOL, payload: { id } })
