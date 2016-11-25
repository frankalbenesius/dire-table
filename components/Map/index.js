import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'

import Board from './Board'
import Frame from './Frame'
import Grid from './Grid'

const mapStateToProps = state => ({
  areas: state.areas,
  settings: state.settings,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const calcBoardPixels = (cellSize, boardSize) => (cellSize * boardSize) + 1

const Map = ({ settings }) => {
  const boardSizePx = calcBoardPixels(settings.cellSize, settings.boardSize)
  return (
    <Frame boardSizePx={boardSizePx}>
      <Board boardSizePx={boardSizePx}>
        {/* <Areas /> */}
        {/* <Tokens /> */}
        {/* <Fog /> */}
        <Grid cellSize={settings.cellSize} />
      </Board>
    </Frame>
  )
}
Map.propTypes = {
  settings: React.PropTypes.shape({
    cellSize: React.PropTypes.number,
    boardSize: React.PropTypes.number,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
