import { combineReducers } from 'redux'
import areas from './areas'
import settings from './settings'

const rootReducer = combineReducers({
  areas,
  settings,
})

export default rootReducer
