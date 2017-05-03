import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from 'next/router';

import database, { initTable } from '../database';
import initStore from '../store';
import reducer from '../store/reducers';

import Map from '../containers/Map';
import Chat from '../containers/Chat';
import Overlay from '../containers/Overlay';

import Wrapper from '../components/Wrapper';

export default class Index extends React.Component {
  static async getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(reducer, undefined, isServer);
    return { initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.state = { connected: false, table: undefined };
    this.store = initStore(reducer, props.initialState, props.isServer);
  }

  componentDidMount() {
    const proposedKey = this.props.url.query.key; // may be undefined
    initTable(proposedKey).then((actualKey) => {
      Router.replace(
        {
          pathname: '/',
          query: { key: actualKey },
        },
        {
          pathname: `/${actualKey}`,
          query: {},
        },
      );
      this.setState({ table: actualKey });
    });
    // TODO: just put this in redux
    database.ref('.info/connected').on('value', (snapshot) => {
      const connected = snapshot.val();
      this.setState({ connected });
    });
  }

  render() {
    if (this.state.connected) {
      return (
        <Provider store={this.store}>
          <Wrapper>
            <Map table={this.state.table} />
            <Overlay table={this.state.table} />
            <Chat table={this.state.table} />
          </Wrapper>
        </Provider>
      );
    }
    return <span>Connecting...</span>;
  }
}
Index.propTypes = {
  initialState: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isServer: PropTypes.bool,
  url: PropTypes.object,
};
