import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'

import Toolbar from '../../components/Toolbar'

const mapStateToProps = state => ({
  tool: state.tool,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const Tools = () => (
  <Toolbar />
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tools)
