import { createStore, applyMiddleware } from 'redux'

export default function initStore(reducer, initialState, isServer) {
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState)
  }
  if (!window.store) {
    window.store = createStore(reducer, initialState)
  }
  return window.store
}
