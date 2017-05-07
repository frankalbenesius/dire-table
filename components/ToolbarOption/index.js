import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import glamorous from 'glamorous';

import Icon from '../Icon';
import { colors, sizes, zIndexes } from '../constants';

const toolStyles = {
  position: 'relative',
  width: '46px',
  height: '46px',
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
  ':hover > div': {
    visibility: 'visible',
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
const ToolTooltip = glamorous.div({
  position: 'absolute',
  zIndex: zIndexes.hover,
  visibility: 'hidden',
  backgroundColor: colors.text,
  padding: '0.2rem 0.4rem',
  fontFamily: 'Vulf Mono Regular',
  color: colors.white,
  left: '100%',
  top: '50%',
  marginTop: '-0.7rem',
  marginLeft: '0.5rem',
  width: 'auto',
  whiteSpace: 'nowrap',
  borderRadius: sizes.radius,
  // border: '1px solid black',
});

const ToolbarOption = ({ name, icon, onClick, selected }) => (
  <button className={selected ? styles.selected : styles.tool} onClick={onClick}>
    <Icon icon={icon} />
    <ToolTooltip>{name}</ToolTooltip>
  </button>
);
ToolbarOption.propTypes = {
  selected: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default ToolbarOption;
