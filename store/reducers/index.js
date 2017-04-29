import { combineReducers } from 'redux';
import areas from './areas';
import board from './board';
import chat from './chat';
import fogs from './fogs';
import players from './players';
import tokens from './tokens';
import tool from './tool';

const rootReducer = combineReducers({
  areas,
  board,
  chat,
  fogs,
  players,
  tokens,
  tool,
});

export default rootReducer;
