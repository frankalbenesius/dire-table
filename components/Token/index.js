import React from 'react';
import PropTypes from 'prop-types';
import { style } from 'glamor';
import { connect } from 'react-firebase';

import { toCircle } from '../../util/board';
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
  if (props.token && props.owner) {
    const dragging = props.draggingKey === props.tokenKey;

    const circle = toCircle(props.board, props.token.location, props.token.size);
    const cx = dragging ? props.cursor.x : circle.cx;
    const cy = dragging ? props.cursor.y : circle.cy;
    const radius = circle.radius;
    const iconRadius = radius - Math.sqrt(circle.radius * 3); // not sure why this works so well

    const draggable =
      props.tool === 'cursor' && (props.player.gm || props.player.key === props.owner.key);

    let tokenClass = styles.undraggable;
    if (draggable) {
      tokenClass = dragging ? styles.dragging : styles.draggable;
    }
    if (props.transparent) {
      tokenClass = styles.cursor;
    }
    // const onMouseDown = draggable ? this.createHandleMouseDown(token.key) : null;
    // const onMouseUp = draggable ? this.handleMouseUp : null;
    // const dragging = token.key === this.state.draggingTokenId;

    return (
      <g className={tokenClass} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp}>
        <circle
          draggable="true"
          filter="url(#dropshadow)"
          cx={cx}
          cy={cy}
          r={circle.radius - noPx(sizes.tokenPadding)}
          fill={props.owner.gm ? colors.white : props.owner.color}
        />
        <svg x={cx - iconRadius} y={cy - iconRadius} width={iconRadius * 2} height={iconRadius * 2}>
          <Icon icon={props.token.icon} />
        </svg>
      </g>
    );
  }
  return null;
};
Token.propTypes = {
  transparent: PropTypes.bool, // tokenCursor uses this
  onMouseUp: PropTypes.func, // from props, could refactor further
  onMouseDown: PropTypes.func, // from props, could refactor further
  draggingKey: PropTypes.string, // from props, could refactor further
  cursor: PropTypes.object, // from props
  // ownerKey: PropTypes.string, // from props
  tokenKey: PropTypes.string, // from props
  // tableKey: PropTypes.string, // from redux
  // playerKey: PropTypes.string, // from redux
  board: PropTypes.object, // from redux
  tool: PropTypes.string, // from redux
  token: PropTypes.object, // from firebase
  player: PropTypes.object, // from firebase
  owner: PropTypes.object, // from firebase
};
Token.defaultProps = {};

const MapFirebaseToProps = ({ tableKey, ownerKey, playerKey, tokenKey }) => ({
  owner: `tables/${tableKey}/players/${ownerKey}`,
  player: `tables/${tableKey}/players/${playerKey}`,
  token: `tables/${tableKey}/tokens/${tokenKey}`,
});

export default connect(MapFirebaseToProps)(Token);
