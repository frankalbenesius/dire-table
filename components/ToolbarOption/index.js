import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

import Icon from '../Icon';
import { colors } from '../constants';

const toolStyles = {
  width: '50px',
  height: '50px',
  textAlign: 'center',
  outline: 0,
  display: 'flex',
  borderTop: '0',
  borderLeft: '0',
  borderRight: '0',
  borderBottom: `2px solid ${colors.black}`,
  backgroundColor: colors.tools,
  ':last-child': {
    borderBottom: '0',
  },
  ':hover': {
    backgroundColor: colors.selection,
  },
};
const styles = {
  tool: css({
    ...toolStyles,
  }),
  selected: css({
    ...toolStyles,
    backgroundColor: colors.selection,
  }),
};

const Tools = ({ icon, onClick, selected }) => (
  <button className={selected ? styles.selected : styles.tool} onClick={onClick}>
    <Icon icon={icon} />
  </button>
);
Tools.propTypes = {
  selected: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default Tools;
