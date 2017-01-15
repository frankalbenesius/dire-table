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

const Map = ({ areas, board, tokens }) => {
  const boardPx = (board.squarePx * board.size) + 1
  const centerPx = boardPx / 2
  const mapUtils = createMapUtils(centerPx, board.squarePx)
  return (
    <Frame centerPx={centerPx}>
      <Board boardPx={boardPx}>
        {areas.map((area, i) => (
          <Area
            key={i}
            path={mapUtils.toPath(area)}
          />
        ))}
        <Grid squarePx={board.squarePx} />
        {Object.keys(tokens).map(id => tokens[id]).sort(bySize).map((token, i) => (
          <Token
            key={i}
            id={token.id}
            player={token.player}
            icon={token.icon}
            {...mapUtils.toCircle(token.location, token.size)}
          />
        ))}
      </Board>
    </Frame>
  )
}
Map.propTypes = {
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  tokens: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  board: React.PropTypes.shape({
    squarePx: React.PropTypes.number,
    boardWidth: React.PropTypes.number,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
