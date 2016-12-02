import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import { toPath } from './mapping'

import Areas from './Areas'
import Board from './Board'
import Fog from './Fog'
import Frame from './Frame'
import Grid from './Grid'

const mapStateToProps = state => ({
  areas: state.areas,
  fog: state.fog,
  settings: state.settings,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const calcBoardPixels = (cellSize, boardSize) => (cellSize * boardSize) + 1

const Map = ({ areas, fog, settings }) => {
  const boardSizePx = calcBoardPixels(settings.cellSize, settings.boardSize)
  const centerPx = boardSizePx / 2
  return (
    <Frame centerPx={centerPx}>
      <Board boardSizePx={boardSizePx}>
        <Areas paths={areas.map(toPath(centerPx, settings.cellSize))} />
        {/* <Map Elements /> */}
        <Fog path={toPath(centerPx, settings.cellSize)(fog)} fogOpacity={settings.fogOpacity} />
        <Grid cellSize={settings.cellSize} />
        {/* <Tokens /> */}
      </Board>
    </Frame>
  )
}
Map.propTypes = {
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  fog: React.PropTypes.arrayOf(React.PropTypes.array),
  settings: React.PropTypes.shape({
    cellSize: React.PropTypes.number,
    boardSize: React.PropTypes.number,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
