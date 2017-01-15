import React from 'react'
import { Provider } from 'react-redux'
import Head from 'next/head'

import initStore from '../store'
import reducer from '../store/reducers'

import Map from '../containers/Map'
import Chat from '../containers/Chat'
import Tools from '../containers/Tools'

import Wrapper from '../components/Wrapper'

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
          <Head>
            <title>Dire Tools: Map</title>
            <link rel="stylesheet" href="static/css/index.css" />
          </Head>
          <Map />
          <Tools />
          <Chat />
        </Wrapper>
      </Provider>
    )
  }
}
Index.propTypes = {
  initialState: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isServer: React.PropTypes.bool,
}
