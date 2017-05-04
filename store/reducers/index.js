import { combineReducers } from 'redux';
import board from './board';
import tool from './tool';

const rootReducer = combineReducers({
  board,
  tool,
});

export default rootReducer;
