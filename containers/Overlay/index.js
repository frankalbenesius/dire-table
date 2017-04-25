import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import { tools } from '../../store/reducers/tool';
import { getTokens } from '../../store/reducers/tokens';

import Toolbar from '../../components/Toolbar';
import ToolbarOption from '../../components/ToolbarOption';
import Inventory from '../../components/Inventory';

const mapStateToProps = state => ({
  selectedTool: state.tool,
  tokens: getTokens(state.tokens).list,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

const Tools = ({ selectedTool, tokens, actions }) => (
  <div>
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
    <Inventory tokens={tokens} />
  </div>
);
Tools.propTypes = {
  selectedTool: PropTypes.string,
  actions: PropTypes.object,
  tokens: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
