import roller from 'rpgdicejs';
import trim from 'lodash/trim';

export default (text) => {
  const commandRegex = /^\/([a-zA-Z]+)( .*)?/g; // matches /letters and optional argument
  const match = commandRegex.exec(text);
  if (match) {
    const command = match[1];
    const argument = match[2] ? trim(match[2]) : ''; // get rid of leading whitespace
    if ((command === 'roll' || command === 'r') && argument) {
      try {
        const result = roller.eval(argument);
        return {
          type: 'roll',
          content: {
            formula: argument,
            evaluation: result.render(),
            value: result.value,
          },
        };
      } catch (e) {
        return {
          type: 'error',
          content: `Couldn't understand roll: "${argument}"`,
        };
      }
    }
    if (command === 'name' || command === 'n') {
      if (argument) {
        return {
          type: 'command',
          content: {
            command: 'name',
            argument,
          },
        };
      }
      if (argument) {
        return {
          type: 'error',
          content: `"${argument}" isn't a valid name."`,
        };
      }
      return {
        type: 'error',
        content: 'You must provide a new name, like "/name Frank".',
      };
    }
    if (command === 'color' || command === 'c') {
      return {
        type: 'command',
        content: {
          command: 'color',
          argument,
        },
      };
    }
    if (command === 'clear') {
      return {
        type: 'command',
        content: {
          command,
          argument,
        },
      };
    }
    return {
      type: 'error',
      content: `Unrecognized command: "/${command}"`,
    };
  }
  return {
    type: 'text',
    content: text,
  };
};
