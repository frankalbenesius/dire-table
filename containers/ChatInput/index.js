import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import { connect } from 'react-firebase';
import firebase from 'firebase';

import parseInput from './parseInput';
import { colors, sizes } from '../../components/constants';

const propTypes = {
  playerKey: PropTypes.string,
  sendMessage: PropTypes.func,
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
            placeholder={'Type "/roll 1d20" to roll.'}
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

export default connect(({ tableKey }, ref) => ({
  sendMessage: (player, text) => {
    const message = parseInput(player, text, firebase.database.ServerValue.TIMESTAMP);
    if (message.type !== 'error') {
      ref(`tables/${tableKey}/messages`).push(message);
    } else {
      // TODO: do something with the error
    }
  },
}))(ChatInput);
