import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import { colors, sizes } from '../constants';

const propTypes = {
  onSubmit: PropTypes.func,
};

const styles = {
  wrapper: style({
    padding: '0.5rem 0.5rem',
    backgroundColor: colors.gray,
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
        () => this.props.onSubmit(text),
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

export default ChatInput;
