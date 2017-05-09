import React from 'react';
import PropTypes from 'prop-types';

import Token from '../../components/Token';
import TokenCursor from '../../components/TokenCursor';

const tokenSort = draggingTokenId => (a, b) => {
  if (a.size !== b.size) return b.size - a.size; // size is highest priority
  if (a.key === draggingTokenId) return 1; // dragging is next highest priority
  if (b.key === draggingTokenId) return null;
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
        {this.props.tokens
          .sort(tokenSort(this.state.draggingTokenId))
          .map(token => (
            <Token
              key={token.key}
              draggingKey={this.state.draggingTokenId}
              cursor={this.props.cursor}
              onMouseDown={this.createHandleMouseDown(token.key)}
              onMouseUp={this.handleMouseUp}
              board={this.props.board}
              tool={this.props.tool}
              ownerKey={token.player}
              tableKey={this.props.tableKey}
              playerKey={this.props.playerKey}
              tokenKey={token.key}
            />
          ))}
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
  newTokenPlayer: PropTypes.object,
  tokens: PropTypes.array,
  tableKey: PropTypes.string,
  playerKey: PropTypes.string,
};

export default TokenLayer;
