import * as types from '../actionTypes'

export const dragTokenStart = tokenId => ({ type: types.DRAG_TOKEN_START, tokenId })
export const dragTokenEnd = () => ({ type: types.DRAG_TOKEN_END })
