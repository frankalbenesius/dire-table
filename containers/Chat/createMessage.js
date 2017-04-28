import roller from 'rpgdicejs';
import trim from 'lodash/trim';

export default (myId, text) => {
  const commandRegex = /^\/([a-zA-Z]+)( .*)?/g; // matches /letters and optional argument
  const match = commandRegex.exec(text);
  if (match) {
    const command = match[1];
    const argument = match[2] ? trim(match[2]) : ''; // get rid of leading whitespace
    if ((command === 'roll' || command === 'r') && argument) {
      try {
        const result = roller.eval(argument);
        return {
          player: myId,
          timestamp: Date.now(),
          type: 'roll',
          content: {
            formula: argument,
            evaluation: result.render(),
            value: result.value,
          },
        };
      } catch (e) {
        // Error: failed to parse roll
        return {
          player: myId,
          timestamp: Date.now(),
          type: 'error',
          content: 'Failed to parse roll.',
        };
      }
    }
    // Error: command doesn't exist
    return {
      player: myId,
      timestamp: Date.now(),
      type: 'error',
      content: "Command doesn't exist.",
    };
  }
  return {
    player: myId,
    timestamp: Date.now(),
    type: 'text',
    content: text,
  };
};
