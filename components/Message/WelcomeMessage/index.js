/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import copy from 'copy-to-clipboard';

import { colors, sizes } from '../../constants';

const PaddedDiv = glamorous.div({
  marginBottom: '0.5rem',
});
const InheritLink = glamorous.a({
  color: 'inherit',
});
const Button = glamorous.button({
  border: 0,
  padding: '0.25rem 0.5rem',
  backgroundColor: colors.button,
  color: colors.white,
  fontFamily: 'Vulf Mono Italic',
  borderRadius: sizes.radius,
  ':active': {
    backgroundColor: colors.buttonActive,
  },
});
const DisplayName = glamorous.div({
  marginTop: '0.2rem',
  fontSize: '1.2em',
  fontFamily: 'Vulf Mono Bold Italic',
});

class WelcomeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.tableLink = `${window.location.origin}/${this.props.tableKey}`;
  }
  handleClick = () => {
    this.setState({ copied: true }, () => {
      copy(this.tableLink);
    });
  };
  render() {
    return (
      <div>
        <PaddedDiv>
          Welcome to <span style={{ color: colors.brand }}>Dire Table</span>!
        </PaddedDiv>
        <PaddedDiv>
          Share the
          {' '}
          <InheritLink href={this.tableLink}>Table Link</InheritLink>
          {' '}
          with your friends to invite them.
        </PaddedDiv>
        <PaddedDiv>
          <Button onClick={this.handleClick}>
            Copy Table Link
          </Button>
        </PaddedDiv>
        <PaddedDiv>
          Your display name is:
          <DisplayName style={{ color: this.props.player.color }}>
            {' '}{this.props.player.name}
          </DisplayName>
        </PaddedDiv>
      </div>
    );
  }
}
WelcomeMessage.propTypes = {
  player: PropTypes.object,
  tableKey: PropTypes.string,
};

export default WelcomeMessage;
