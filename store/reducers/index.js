import { combineReducers } from 'redux'
import areas from './areas'
import board from './board'
import chat from './chat'
import fogs from './fogs'
import tokens from './tokens'

const rootReducer = combineReducers({
  areas,
  board,
  chat,
  fogs,
  tokens,
})

export default rootReducer
