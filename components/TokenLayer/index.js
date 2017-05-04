import React from 'react';
import PropTypes from 'prop-types';

import Token from '../../components/Token';
import TokenCursor from '../../components/TokenCursor';
import { toCircle } from '../../util/board';

const tokenSort = draggingTokenId => (a, b) => {
  if (a.size !== b.size) return b.size - a.size; // size is highest priority
  if (a.id === draggingTokenId) return 1; // dragging is next highest priority
  if (b.id === draggingTokenId) return null;
  return a.lastUpdated - b.lastUpdated; // last priority is most recently touched
};

class TokenLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggingTokenId: null,
    };
    this.createHandleMouseDown = this.createHandleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  createHandleMouseDown(tokenId) {
    return (e) => {
      if (e.nativeEvent.which === 1) {
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) this.props.onShiftClick(tokenId);
        else this.setState({ draggingTokenId: tokenId });
      }
    };
  }

  handleMouseUp(e) {
    if (e.nativeEvent.which) {
      e.preventDefault();
      e.stopPropagation();
      if (this.state.draggingTokenId) {
        this.props.onDrag(this.state.draggingTokenId);
      }
      this.setState({ draggingTokenId: null });
    }
  }

  render() {
    return (
      <g>
        {this.props.tokens.sort(tokenSort(this.state.draggingTokenId)).map((token, i) => {
          const circle = toCircle(this.props.board, token.location, token.size);
          const editable =
            this.props.tool === 'cursor' &&
            !!this.props.player &&
            (this.props.player.id === 0 || this.props.player.id === token.player);
          const onMouseDown = editable ? this.createHandleMouseDown(token.id) : null;
          const onMouseUp = editable ? this.handleMouseUp : null;
          const dragging = token.id === this.state.draggingTokenId;
          const cx = dragging ? this.props.cursor.x : circle.cx;
          const cy = dragging ? this.props.cursor.y : circle.cy;
          return (
            <Token
              key={i}
              id={token.id}
              player={this.props.players[token.player]}
              icon={token.icon}
              cx={cx}
              cy={cy}
              draggable={editable}
              dragging={dragging}
              radius={circle.radius}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            />
          );
        })}
        <TokenCursor
          active={this.props.tool === 'token'}
          board={this.props.board}
          cursor={this.props.cursor}
          newTokenPlayer={this.props.newTokenPlayer}
        />
      </g>
    );
  }
}
TokenLayer.propTypes = {
  tool: PropTypes.string,
  board: PropTypes.object,
  cursor: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onShiftClick: PropTypes.func,
  onDrag: PropTypes.func,
  player: PropTypes.object,
  players: PropTypes.object,
  newTokenPlayer: PropTypes.object,
  tokens: PropTypes.array,
};

export default TokenLayer;
