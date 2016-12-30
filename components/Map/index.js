import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'

import Areas from './Areas'
import Board from './Board'
// import Fogs from './Fogs'
import Frame from './Frame'
import Grid from './Grid'
import Tokens from './Tokens'

const mapStateToProps = state => ({
  areas: state.areas,
  fogs: state.fogs,
  settings: state.settings,
  tokens: state.tokens,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const calcBoardPixels = (cellSize, boardSize) => (cellSize * boardSize) + 1

const Map = ({ areas, settings, tokens }) => {
  const boardPx = calcBoardPixels(settings.cellSize, settings.boardSize)
  const sizes = {
    boardPx,
    centerPx: boardPx / 2,
    unitPx: settings.cellSize,
  }
  return (
    <Frame {...sizes}>
      <Board {...sizes}>
        <Areas areas={areas} />
        {/* <Fogs fogs={fogs} opacity={settings.fogOpacity} /> */}
        <Grid cellSize={settings.cellSize} />
        <Tokens tokens={tokens} />
      </Board>
    </Frame>
  )
}
Map.propTypes = {
  // fogs: React.PropTypes.arrayOf(React.PropTypes.array),
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  tokens: React.PropTypes.arrayOf(React.PropTypes.object),
  settings: React.PropTypes.shape({
    cellSize: React.PropTypes.number,
    boardSize: React.PropTypes.number,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
