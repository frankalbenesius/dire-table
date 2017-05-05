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
  handleToolClick: (toolId, newTokenPlayerId) => dispatch(selectTool(toolId, newTokenPlayerId)),
  handleRosterClick: playerId => dispatch(selectTool('token', playerId)),
});

class Overlay extends React.Component {
  componentDidMount() {}
  render() {
    if (this.props.players) {
      const player = this.props.players[this.props.playerKey];
      player.key = this.props.playerKey;
      return (
        <div>
          {player.gm
            ? <Toolbar>
              {tools.map((tool, i) => (
                <ToolbarOption
                  key={i}
                  icon={tool.icon}
                  selected={tool.id === this.props.selectedTool}
                  onClick={() => this.props.handleToolClick(tool.id, player.key)}
                />
                ))}
            </Toolbar>
            : null}
          <Roster
            player={player}
            players={this.props.players}
            onPlayerClick={this.props.handleRosterClick}
          />
        </div>
      );
    }
    return null;
  }
}
Overlay.propTypes = {
  selectedTool: PropTypes.string,
  handleToolClick: PropTypes.func,
  handleRosterClick: PropTypes.func,
  players: PropTypes.object,
  playerKey: PropTypes.string,
};

const mapFirebaseToProps = ({ table }) => ({
  players: `tables/${table}/players`,
});

export default connect(mapStateToProps, mapDispatchToProps)(fbConnect(mapFirebaseToProps)(Overlay));
