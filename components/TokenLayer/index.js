import React from 'react'
import Token from '../../components/Token'
import TokenCursor from '../../components/TokenCursor'
import { toCircle } from '../../utilities/map'

const tokenSort = draggingTokenId => (a, b) => {
  if (a.size !== b.size) return (b.size - a.size) // size is highest priority
  if (a.id === draggingTokenId) return 1 // dragging is next highest priority
  if (b.id === draggingTokenId) return -1
  return (a.lastUpdated - b.lastUpdated) // last priority is most recently touched
}

class TokenLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      draggingTokenId: -1,
    }
    this.createHandleDragStart = this.createHandleDragStart.bind(this)
    this.handleDragStop = this.handleDragStop.bind(this)
  }

  createHandleDragStart(tokenId) {
    return (e) => {
      if (e.nativeEvent.which === 1) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ draggingTokenId: tokenId })
      }
    }
  }

  createHandleTokenClick(tokenId) {
    return (e) => {
      if (e.nativeEvent.which === 1) {
        e.preventDefault()
        e.stopPropagation()
        if (e.shiftKey) this.props.onShiftClick(tokenId)
        else this.props.onClick(tokenId)
      }
    }
  }

  handleDragStop(e) {
    if (e.nativeEvent.which) {
      e.preventDefault()
      e.stopPropagation()
      if (this.state.draggingTokenId > -1) {
        this.props.onDrag(this.state.draggingTokenId)
      }
      this.setState({ draggingTokenId: -1 })
    }
  }

  render() {
    return (
      <g>
        {this.props.tokens.sort(tokenSort(this.state.draggingTokenId)).map((token, i) => {
          const circle = toCircle(this.props.board, token.location, token.size)
          const editable = this.props.tool === 'cursor' && (
            this.props.playerId === 0 || this.props.playerId === token.player
          )
          const onMouseDown = editable ? this.createHandleDragStart(token.id) : null
          const onMouseUp = editable ? this.handleDragStop : null
          const onClick = editable ? this.createHandleTokenClick(token.id) : null
          const dragging = (token.id === this.state.draggingTokenId)
          const cx = dragging ? this.props.cursor.x : circle.cx
          const cy = dragging ? this.props.cursor.y : circle.cy
          return (
            <Token
              key={i}
              id={token.id}
              player={token.player}
              icon={token.icon}
              cx={cx}
              cy={cy}
              draggable={editable}
              dragging={dragging}
              radius={circle.radius}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onClick={onClick}
            />
          )
        })}
        <TokenCursor
          active={this.props.tool === 'token'}
          board={this.props.board}
          cursor={this.props.cursor}
        />
      </g>
    )
  }
}
TokenLayer.propTypes = {
  tool: React.PropTypes.string,
  board: React.PropTypes.object,
  cursor: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
  onClick: React.PropTypes.func,
  onShiftClick: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  playerId: React.PropTypes.number,
  tokens: React.PropTypes.array,
}

export default TokenLayer
