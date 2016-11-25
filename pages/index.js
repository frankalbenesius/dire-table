import React from 'react'
import { Provider } from 'react-redux'
import initStore from '../store'
import reducer from '../store/reducers'

import Wrapper from '../components/Wrapper'
import Map from '../components/Map'
import Chat from '../components/Chat'

export default class Index extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(reducer, undefined, isServer)
    return { initialState: store.getState(), isServer }
  }

  constructor(props) {
    super(props)
    this.store = initStore(reducer, props.initialState, props.isServer)
  }

  render() {
    return (
      <Provider store={this.store}>
        <Wrapper>
          <Map></Map>
          <Chat></Chat>
        </Wrapper>
      </Provider>
    )
  }
}
