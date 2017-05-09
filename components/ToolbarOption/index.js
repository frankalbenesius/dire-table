import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import glamorous from 'glamorous';

import Icon from '../Icon';
import { colors, sizes, zIndexes, opacity } from '../constants';

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
const Tooltip = glamorous.div({
  position: 'absolute',
  zIndex: zIndexes.hover,
  visibility: 'hidden',
  backgroundColor: colors.text,
  padding: '0.2rem 0.4rem',
  fontFamily: 'Vulf Mono Regular',
  fontSize: '0.9rem',
  color: colors.white,
  left: '100%',
  top: '0',
  marginLeft: '0.5rem',
  borderRadius: sizes.radius,
  textAlign: 'left',
  width: '15rem',
  opacity,
});
const TooltipTitle = glamorous.div({
  fontFamily: 'Vulf Mono Bold',
  borderBottom: `1px dashed ${colors.black}`,
});
const TooltipNugget = glamorous.div({
  fontFamily: 'Vulf Mono Italic',
  whiteSpace: 'normal',
  maxWidth: '15rem',
  fontSize: '0.8em',
  lineHeight: '1em',
  margin: '0.6em 0',
});

const ToolbarOption = ({ name, info, icon, onClick, selected }) => (
  <button className={selected ? styles.selected : styles.tool} onClick={onClick}>
    <Icon icon={icon} />
    <Tooltip>
      <TooltipTitle>{name}</TooltipTitle>
      {info.map((nugget, i) => <TooltipNugget key={i}>{nugget}</TooltipNugget>)}
    </Tooltip>
  </button>
);
ToolbarOption.propTypes = {
  selected: PropTypes.bool,
  icon: PropTypes.string,
  name: PropTypes.string,
  info: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

export default ToolbarOption;
