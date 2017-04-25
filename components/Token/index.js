import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import { colors, sizes, noPx, opacity } from '../constants';
import Icon from '../Icon';

const tokenStyles = {
  fill: '#000000',
  pointerEvents: 'all',
};
const styles = {
  undraggable: style({
    ...tokenStyles,
    cursor: 'default',
  }),
  draggable: style({
    ...tokenStyles,
    cursor: 'grab',
  }),
  dragging: style({
    ...tokenStyles,
    cursor: 'grabbing',
  }),
  cursor: style({
    ...tokenStyles,
    opacity,
  }),
};

const Token = (props) => {
  const iconRadius = props.radius - Math.sqrt(props.radius * 3); // not sure why this works so well
  let tokenClass = styles.undraggable;
  if (props.draggable) {
    tokenClass = props.dragging ? styles.dragging : styles.draggable;
  }
  if (props.cursor) {
    tokenClass = styles.cursor;
  }
  return (
    <g
      className={tokenClass}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
    >
      <circle
        draggable="true"
        filter="url(#dropshadow)"
        cx={props.cx}
        cy={props.cy}
        r={props.radius - noPx(sizes.tokenPadding)}
        fill={colors.player[props.player]}
      />
      <svg
        x={props.cx - iconRadius}
        y={props.cy - iconRadius}
        width={iconRadius * 2}
        height={iconRadius * 2}
      >
        <Icon icon={props.icon} />
      </svg>
    </g>
  );
};
Token.propTypes = {
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  player: PropTypes.number,
  icon: PropTypes.string,
  radius: PropTypes.number,
  draggable: PropTypes.bool,
  dragging: PropTypes.bool,
  cursor: PropTypes.bool,
  cx: PropTypes.number,
  cy: PropTypes.number,
};
Token.defaultProps = {};

export default Token;
