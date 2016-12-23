import { combineReducers } from 'redux'
import areas from './areas'
import fogs from './fogs'
import tokens from './tokens'
import settings from './settings'

const rootReducer = combineReducers({
  areas,
  fogs,
  tokens,
  settings,
})

export default rootReducer
