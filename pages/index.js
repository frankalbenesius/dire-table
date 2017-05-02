import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from 'next/router';

import { initTable } from '../database';

import initStore from '../store';
import reducer from '../store/reducers';

import Map from '../containers/Map';
import Chat from '../containers/Chat';
import Overlay from '../containers/Overlay';

import Wrapper from '../components/Wrapper';

export default class Index extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    const store = initStore(reducer, undefined, isServer);

    const tableKey = query.key; // may be undefined
    const table = await initTable(tableKey);

    return { table, initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(reducer, props.initialState, props.isServer);
  }

  componentDidMount() {
    Router.replace({
      pathname: '/',
      query: {},
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <Wrapper>
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
