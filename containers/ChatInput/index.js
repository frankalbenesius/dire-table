import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import { connect } from 'react-firebase';
import firebase from 'firebase';

import parseInput from './parseInput';
import { colors, sizes } from '../../components/constants';
import getPlayerColor from '../../database/getPlayerColor';

const propTypes = {
  playerKey: PropTypes.string,
  sendMessage: PropTypes.func,
  // onError: PropTypes.func, // for firebase functions
  // table: PropTypes.string // connected to firebase
};

const styles = {
  wrapper: style({
    padding: '0.5rem 0.5rem',
    borderTop: `1px solid ${colors.gray}`,
  }),
  input: style({
    border: 0,
    padding: '0.5rem',
    width: '100%',
    resize: 'none',
    marginBottom: '0.5rem',
    display: 'block',
    borderRadius: sizes.radius,
    backgroundColor: colors.white,
  }),
  submit: style({
    border: 0,
    padding: '0.5rem 1rem',
    float: 'right',
    fontSize: '0.8rem',
    backgroundColor: colors.blue,
    color: colors.white,
    fontFamily: 'Vulf Mono Italic',
    borderRadius: sizes.radius,
    ':active': {
      backgroundColor: colors.buttonActive,
    },
  }),
};

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };
  checkForEnterKey = (event) => {
    if (event.key === 'Enter') {
      this.submit(event);
    }
  };
  submit = (event) => {
    event.preventDefault();
    const text = this.state.text;
    if (text) {
      this.setState(
        {
          text: '',
        },
        () => this.props.sendMessage(this.props.playerKey, text),
      );
    }
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <form onSubmit={this.submit}>
          <textarea
            rows={3}
            placeholder={'Enter a message or command.'}
            className={styles.input}
            onChange={this.handleChange}
            onKeyPress={this.checkForEnterKey}
            value={this.state.text}
          />
          <input className={styles.submit} type="submit" value="SEND" />
        </form>
      </div>
    );
  }
}
ChatInput.propTypes = propTypes;

export default connect(({ tableKey, playerKey, onError }, ref) => ({
  sendMessage: (player, text) => {
    const message = parseInput(player, text, firebase.database.ServerValue.TIMESTAMP);
    switch (message.type) {
      case 'command': {
        // do something unique, sometimes on db
        const { command, argument } = message.content;
        switch (command) {
          case 'color': {
            const playersRef = ref(`tables/${tableKey}/players`);
            try {
              playersRef.transaction((players) => {
                if (players) {
                  // otherwise there are no players (shouldn't happen)
                  const myPlayer = players[playerKey];
                  if (!myPlayer.gm) {
                    const currentColors = Object.values(players)
                      .filter(p => !!p.color)
                      .map(p => p.color);
                    myPlayer.color = getPlayerColor(myPlayer.gm, currentColors);
                  } else {
                    throw new Error('GMs cannot change their color.');
                  }
                }
                return players;
              });
            } catch (e) {
              // gms cannot change color
              onError({
                player: playerKey,
                timestamp: Date.now(),
                type: 'error',
                content: e.message,
              });
            }
            break;
          }
          case 'name': {
            const playerRef = ref(`tables/${tableKey}/players/${playerKey}`);
            const maxNameLength = 20;
            playerRef.update({
              name: argument.substring(0, maxNameLength),
            });
            break;
          }
          case 'clear': {
            const playerRef = ref(`tables/${tableKey}/players/${playerKey}`);
            playerRef.once('value', (snapshot) => {
              const isGm = snapshot.val().gm;
              if (isGm) {
                const tableRef = ref(`tables/${tableKey}`);
                const updates = {
                  '/areas': null,
                  '/tokens': null,
                };
                tableRef.update(updates);
              } else {
                onError({
                  player: playerKey,
                  timestamp: Date.now(),
                  type: 'error',
                  content: 'Only GMs can clear the board.',
                });
              }
            });
            break;
          }
          default: {
            onError({
              player: playerKey,
              timestamp: Date.now(),
              type: 'error',
              content: `Allowed an unrecognized command: /${command}`,
            });
          }
        }
        break;
      }
      case 'error': {
        onError({
          player: playerKey,
          timestamp: Date.now(),
          type: 'error',
          content: message.content,
        });
        break;
      }
      default: {
        ref(`tables/${tableKey}/messages`).push(message);
        break;
      }
    }
  },
}))(ChatInput);
