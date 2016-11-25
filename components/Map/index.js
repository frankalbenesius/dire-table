import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'

import Board from './Board'
import Frame from './Frame'
import Grid from './Grid'

const mapStateToProps = state => ({
  areas: state.areas,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const calcBoardPixels = ( cellSize, boardSize ) => {
  return cellSize * boardSize + 1;
}

const Map = ({ cellSize, boardSize }) => {
  const boardSizePx = calcBoardPixels(cellSize, boardSize)
  return (
    <Frame boardSizePx={boardSizePx}>
      <Board boardSizePx={boardSizePx}>
        {/* <Areas /> */}
        {/* <Tokens /> */}
        {/* <Fog /> */}
        <Grid cellSize={cellSize} />
      </Board>
    </Frame>
  )
}

Map.defaultProps = {
  cellSize: 20,
  boardSize: 30,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)
