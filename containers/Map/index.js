import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import createMapUtils from './mapUtils'

import Area from '../../components/Area'
import Board from '../../components/Board'
import Frame from '../../components/Frame'
import Grid from '../../components/Grid'
import Token from '../../components/Token'

const mapStateToProps = state => ({
  areas: state.areas,
  board: state.board,
  tokens: state.tokens,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const bySize = (a, b) => b.size - a.size
const calcBoardPixels = (cellSize, boardSize) => (cellSize * boardSize) + 1

const Map = ({ areas, board, tokens }) => {
  const boardPx = calcBoardPixels(board.cellSize, board.boardSize)
  const sizes = {
    boardPx,
    centerPx: boardPx / 2,
    unitPx: board.cellSize,
  }
  const mapUtils = createMapUtils(sizes.centerPx, sizes.unitPx)
  return (
    <Frame {...sizes}>
      <Board {...sizes}>
        {
          // AREAS
          areas.map((area, i) => (
            <Area
              key={i}
              path={mapUtils.toPath(area)}
            />
          ))
        }
        <Grid cellSize={board.cellSize} />
        {
          Object.values(tokens).sort(bySize).map((token, i) => (
            <Token
              key={i}
              id={token.id}
              player={token.player}
              icon={token.icon}
              {...mapUtils.toCircle(token.location, token.size)}
            />
          ))
        }
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
