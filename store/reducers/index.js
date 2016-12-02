import { combineReducers } from 'redux'
import areas from './areas'
import fog from './fog'
import settings from './settings'

const rootReducer = combineReducers({
  areas,
  fog,
  settings,
})

export default rootReducer
