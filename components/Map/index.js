import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'

import Areas from './Areas'
import Board from './Board'
import Frame from './Frame'
import Grid from './Grid'
import Tokens from './Tokens'

const mapStateToProps = state => ({
  areas: state.areas,
  board: state.board,
  tokens: state.tokens,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const calcBoardPixels = (cellSize, boardSize) => (cellSize * boardSize) + 1

const Map = ({ areas, board, tokens }) => {
  const boardPx = calcBoardPixels(board.cellSize, board.boardSize)
  const sizes = {
    boardPx,
    centerPx: boardPx / 2,
    unitPx: board.cellSize,
  }
  return (
    <Frame {...sizes}>
      <Board {...sizes}>
        <Areas areas={areas} />
        <Grid cellSize={board.cellSize} />
        <Tokens tokens={tokens} />
      </Board>
    </Frame>
  )
}
Map.propTypes = {
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  tokens: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  board: React.PropTypes.shape({
    cellSize: React.PropTypes.number,
    boardSize: React.PropTypes.number,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
