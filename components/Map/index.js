import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import { toPath } from './mapping'

import Areas from './Areas'
import Board from './Board'
import Fogs from './Fogs'
import Frame from './Frame'
import Grid from './Grid'

const mapStateToProps = state => ({
  areas: state.areas,
  fogs: state.fogs,
  settings: state.settings,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const calcBoardPixels = (cellSize, boardSize) => (cellSize * boardSize) + 1

const Map = ({ areas, fogs, settings }) => {
  const boardSizePx = calcBoardPixels(settings.cellSize, settings.boardSize)
  const centerPx = boardSizePx / 2
  return (
    <Frame centerPx={centerPx}>
      <Board boardSizePx={boardSizePx}>
        <Areas
          paths={areas.map(toPath(centerPx, settings.cellSize))}
        />
        {/* <MapDetails /> */}
        {/* <NPCs /> */}
        <Fogs
          paths={fogs.map(toPath(centerPx, settings.cellSize))}
          fogOpacity={settings.fogOpacity}
        />
        <Grid cellSize={settings.cellSize} />
        {/* <PCs /> */}
      </Board>
    </Frame>
  )
}
Map.propTypes = {
  areas: React.PropTypes.arrayOf(React.PropTypes.array),
  fogs: React.PropTypes.arrayOf(React.PropTypes.array),
  settings: React.PropTypes.shape({
    cellSize: React.PropTypes.number,
    boardSize: React.PropTypes.number,
  }),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
