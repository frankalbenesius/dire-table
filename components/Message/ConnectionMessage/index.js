import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { colors, sizes } from '../../constants';

import WelcomeMessage from './WelcomeMessage';
import CommandsMessage from './CommandsMessage';
import Tag from '../../Tag';

const DisplayName = glamorous.span({
  fontFamily: 'Vulf Mono Bold Italic',
});

const SystemMessage = glamorous.div({
  fontFamily: 'Vulf Mono Light Italic',
  textAlign: 'center',
  color: colors.black,
  marginTop: '1rem',
  borderRadius: sizes.radius,
  padding: '0.5rem',
  border: `1px solid ${colors.gray}`,
});

const ConnectionMessage = (props) => {
  if (props.connectedPlayer.key === props.thisPlayer.key) {
    return (
      <div>
        <SystemMessage>
          <WelcomeMessage tableKey={props.tableKey} player={props.thisPlayer} />
        </SystemMessage>
        <SystemMessage>
          <CommandsMessage thisPlayer={props.thisPlayer} />
        </SystemMessage>
      </div>
    );
  }
  return (
    <SystemMessage>
      <DisplayName style={{ color: props.connectedPlayer.color }}>
        {props.connectedPlayer.name}
        {props.connectedPlayer.gm ? <Tag>{'GM'}</Tag> : null}
      </DisplayName> has joined.
    </SystemMessage>
  );
};
ConnectionMessage.propTypes = {
  connectedPlayer: PropTypes.object,
  thisPlayer: PropTypes.object,
  tableKey: PropTypes.string,
};

export default ConnectionMessage;
