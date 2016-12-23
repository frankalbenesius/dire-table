import { combineReducers } from 'redux'
import areas from './areas'
import fogs from './fogs'
import settings from './settings'

const rootReducer = combineReducers({
  areas,
  fogs,
  settings,
})

export default rootReducer
