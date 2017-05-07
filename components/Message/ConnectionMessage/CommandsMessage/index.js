import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { colors } from '../../../constants';

const Wrapper = glamorous.div({
  textAlign: 'left',
});

const List = glamorous.ul({
  listStyle: 'disc inside none',
  paddingLeft: '0.1rem',
  paddingRight: '0.3rem',
});

const Command = glamorous.li({
  marginTop: '0.6rem',
});

const Header = glamorous.h1({
  fontFamily: 'Vulf Mono Bold',
});

const Code = glamorous.span({
  border: `1px solid ${colors.gray}`,
  backgroundColor: colors.white,
  padding: '0 0.3em',
  color: colors.black,
});

const Guide = glamorous.div({
  marginTop: '0.3rem',
  marginLeft: '1.1rem',
});

const commands = [
  {
    input: '/roll 1d20 + 2',
    guide: 'Rolls the dice.',
    permission: ['gm', 'player'],
  },
  {
    input: '/name Gary',
    guide: 'Updates your player name.',
    permission: ['gm', 'player'],
  },
  {
    input: '/color',
    guide: 'Randomly updates your player color.',
    permission: ['player'],
  },
  {
    input: '/clear',
    guide: 'Clears the map of existing tokens & areas.',
    permission: ['gm'],
  },
];

const CommandsMessage = ({ thisPlayer }) => {
  const scope = thisPlayer.gm ? 'gm' : 'player';
  const scopedCommands = commands.filter(x => x.permission.indexOf(scope) > -1);
  return (
    <Wrapper>
      <Header>Available Commands:</Header>
      <List>
        {scopedCommands.map(command => (
          <Command key={command.input}>
            <Code>{command.input}</Code>
            <Guide>{command.guide}</Guide>
          </Command>
        ))}
      </List>
    </Wrapper>
  );
};
CommandsMessage.propTypes = {
  thisPlayer: PropTypes.object,
};

export default CommandsMessage;
