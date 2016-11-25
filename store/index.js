import { createStore } from 'redux'

export default function initStore(reducer, initialState, isServer) {
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState)
  }
  /* eslint-disable no-undef */
  if (!window.store) {
    window.store = createStore(reducer, initialState)
  }
  return window.store
}
