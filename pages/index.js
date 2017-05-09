import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Router from 'next/router';

import database, { joinTable } from '../database';
import initStore from '../store';
import reducer from '../store/reducers';

import Map from '../containers/Map';
import Chat from '../containers/Chat';
import Overlay from '../containers/Overlay';

import Connecting from '../components/Connecting';
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
    joinTable(proposedKey).then(({ table, player }) => {
      Router.replace(
        {
          pathname: '/',
          query: { key: table },
        },
        {
          pathname: `/${table}`,
          query: {},
        },
      );
      this.setState({ table, player });
    });
    // TODO: just put this in redux?
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
            <Map tableKey={this.state.table} playerKey={this.state.player} />
            <Overlay table={this.state.table} playerKey={this.state.player} />
            <Chat table={this.state.table} playerKey={this.state.player} />
          </Wrapper>
        </Provider>
      );
    }
    return <Connecting />;
  }
}
Index.propTypes = {
  initialState: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isServer: PropTypes.bool,
  url: PropTypes.object,
};
