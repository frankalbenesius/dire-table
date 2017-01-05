import { combineReducers } from 'redux'
import areas from './areas'
import chat from './chat'
import fogs from './fogs'
import tokens from './tokens'
import board from './board'

const rootReducer = combineReducers({
  areas,
  board,
  chat,
  fogs,
  tokens,
})

export default rootReducer
