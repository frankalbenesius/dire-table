import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions'
import { tools } from '../../store/reducers/tool'

import Toolbar from '../../components/Toolbar'
import ToolbarOption from '../../components/ToolbarOption'

const mapStateToProps = state => ({
  selectedTool: state.tool,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
})

const Tools = ({ selectedTool, actions }) => (
  <Toolbar>
    {tools.map((tool, i) => (
      <ToolbarOption
        key={i}
        icon={tool.icon}
        selected={tool.id === selectedTool}
        onClick={() => actions.selectTool(tool.id)}
      />
    ))}
  </Toolbar>
)
Tools.propTypes = {
  selectedTool: React.PropTypes.string,
  actions: React.PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tools)
