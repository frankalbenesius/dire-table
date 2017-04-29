import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Head from 'next/head';

import db from '../store/database';
import initStore from '../store';
import reducer from '../store/reducers';

import Map from '../containers/Map';
import Chat from '../containers/Chat';
import Overlay from '../containers/Overlay';

import Wrapper from '../components/Wrapper';

export default class Index extends React.Component {
  static getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(reducer, undefined, isServer);
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(reducer, props.initialState, props.isServer);
  }

  componentDidMount() {
    const connectedRef = db.ref('.info/connected');
    connectedRef.on('value', (snap) => {
      console.log('connected to database:', snap.val());
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <Wrapper>
          <Head>
            <title>Dire Tools: Table</title>
            <link rel="stylesheet" href="static/css/index.css" />
            <link rel="shortcut icon" href="static/img/favicon.ico" type="image/x-icon" />
            <link rel="icon" href="static/img/favicon.ico" type="image/x-icon" />
          </Head>
          <Map />
          <Overlay />
          <Chat />
        </Wrapper>
      </Provider>
    );
  }
}
Index.propTypes = {
  initialState: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isServer: PropTypes.bool,
};
