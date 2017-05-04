import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connect as fbConnect } from 'react-firebase';

import { selectTool } from '../../store/actions';
import { getCurrentToolId, tools } from '../../store/reducers/tool';

import Toolbar from '../../components/Toolbar';
import ToolbarOption from '../../components/ToolbarOption';
import Roster from '../../components/Roster';

const mapStateToProps = state => ({
  selectedTool: getCurrentToolId(state.tool),
});

const mapDispatchToProps = dispatch => ({
  onToolbarOptionClick: toolId => dispatch(selectTool(toolId)),
  onPlayerClick: playerId => dispatch(selectTool('token', playerId)),
});

class Overlay extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Toolbar>
          {tools.map((tool, i) => (
            <ToolbarOption
              key={i}
              icon={tool.icon}
              selected={tool.id === this.props.selectedTool}
              onClick={() => this.props.onToolbarOptionClick(tool.id)}
            />
          ))}
        </Toolbar>
        <Roster players={this.props.players} onPlayerClick={this.props.onPlayerClick} />
      </div>
    );
  }
}
Overlay.propTypes = {
  selectedTool: PropTypes.string,
  onToolbarOptionClick: PropTypes.func,
  onPlayerClick: PropTypes.func,
  players: PropTypes.object,
};

const mapFirebaseToProps = ({ table }) => ({
  players: `tables/${table}/players`,
});

export default connect(mapStateToProps, mapDispatchToProps)(fbConnect(mapFirebaseToProps)(Overlay));
