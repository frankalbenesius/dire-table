/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import copy from 'copy-to-clipboard';

import { colors, sizes } from '../constants';

const lineHeight = 0.9;
const MessageWrapper = glamorous.div({
  lineHeight: `${lineHeight}rem`,
  margin: '0.4rem 0',
});

const Text = glamorous.div({});

const RollFormula = glamorous.div({
  color: colors.black,
});
const RollEvaluation = glamorous.div({
  color: colors.black,
  maxHeight: `${lineHeight * 8}rem`,
  paddingBottom: '0.3rem',
  overflowY: 'auto',
});
const RollValue = glamorous.div({
  color: colors.text,
  fontSize: '1rem',
  fontFamily: 'Vulf Mono Bold',
});
const Roll = ({ roll, player }) => {
  const RollWrapper = glamorous.div({
    border: `1px solid ${player.color}`,
    borderRadius: sizes.radius,
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: colors.white,
  });
  return (
    <RollWrapper>
      <RollFormula>{roll.formula}</RollFormula>
      <RollEvaluation>{roll.evaluation}</RollEvaluation>
      <RollValue>{roll.value}</RollValue>
    </RollWrapper>
  );
};
Roll.propTypes = {
  player: PropTypes.object,
  roll: PropTypes.object,
};

const SystemMessage = glamorous.div({
  fontFamily: 'Vulf Mono Light Italic',
  textAlign: 'center',
  color: colors.black,
  marginTop: '1rem',
  padding: '0 0.5rem',
});
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
class ConnectionMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.tableLink = `${window.location.origin}/${this.props.tableKey}`;
  }
  handleClick = () => {
    this.setState({ copied: true }, copy(this.tableLink));
  };
  render() {
    if (this.props.connectedPlayer.key === this.props.playerKey) {
      return (
        <SystemMessage>
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
            <Button onClick={this.handleClick}>
              Copy Table Link
            </Button>
          </div>
        </SystemMessage>
      );
    }
    return (
      <SystemMessage>
        <span style={{ color: this.props.connectedPlayer.color }}>
          {this.props.connectedPlayer.gm ? 'GM ' : null}
          {this.props.connectedPlayer.name}
        </span> has joined.
      </SystemMessage>
    );
  }
}
ConnectionMessage.propTypes = {
  connectedPlayer: PropTypes.object,
  playerKey: PropTypes.string,
  tableKey: PropTypes.string,
};

const Message = ({ type, content, fromPlayer, playerKey, tableKey, players }) => {
  let innerMessage;
  switch (type) {
    case 'roll': {
      innerMessage = <Roll roll={content} player={fromPlayer} />;
      break;
    }
    case 'text': {
      innerMessage = <Text>{content}</Text>;
      break;
    }
    case 'connected': {
      const connectedPlayer = {
        ...players[content],
        key: content,
      };
      innerMessage = (
        <ConnectionMessage
          connectedPlayer={connectedPlayer}
          tableKey={tableKey}
          playerKey={playerKey}
        />
      );
      break;
    }
    default: {
      innerMessage = null;
      break;
    }
  }
  return <MessageWrapper>{innerMessage}</MessageWrapper>;
};
Message.propTypes = {
  type: PropTypes.string,
  content: PropTypes.any, //eslint-disable-line
  fromPlayer: PropTypes.object,
  players: PropTypes.object,
  playerKey: PropTypes.string,
  tableKey: PropTypes.string,
};

export default Message;
