import { combineReducers } from 'redux'
import areas from './areas'
import chat from './chat'
import fogs from './fogs'
import tokens from './tokens'
import settings from './settings'

const rootReducer = combineReducers({
  areas,
  chat,
  fogs,
  tokens,
  settings,
})

export default rootReducer
