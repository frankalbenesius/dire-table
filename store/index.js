import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

let middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middleware = [...middleware, logger];
}

const createStoreWithMiddleWare = (reducer, initialState) =>
  createStore(reducer, initialState, applyMiddleware(...middleware));

export default function initStore(reducer, initialState, isServer) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  if (isServer && typeof window === 'undefined') {
    return createStoreWithMiddleWare(reducer, initialState);
  }
  /* eslint-disable no-undef */
  if (!window.store) {
    window.store = createStoreWithMiddleWare(reducer, initialState);
  }
  return window.store;
}
