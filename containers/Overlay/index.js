import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import db from '../../store/database';
import { selectTool, setPlayer, setRoster } from '../../store/actions';
import { getCurrentToolId, tools } from '../../store/reducers/tool';
import { getRoster } from '../../store/reducers/players';
import { getTokens } from '../../store/reducers/tokens';

import Toolbar from '../../components/Toolbar';
import ToolbarOption from '../../components/ToolbarOption';
import Roster from '../../components/Roster';

const mapStateToProps = state => ({
  selectedTool: getCurrentToolId(state.tool),
  roster: getRoster(state.players),
  tokens: getTokens(state.tokens).list,
});

const mapDispatchToProps = dispatch => ({
  onToolbarOptionClick: toolId => dispatch(selectTool(toolId)),
  onPlayerClick: tokenId => dispatch(selectTool('token', tokenId)),
  setPlayer: playerId => dispatch(setPlayer(playerId)),
  setRoster: roster => dispatch(setRoster(roster)),
});

class Overlay extends React.Component {
  componentDidMount() {
    const playersRef = db.ref('players');
    playersRef.on('value', (snap) => {
      const currentPlayers = snap.val() || {};
      this.props.setRoster(currentPlayers);
    });
  }
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
        <Roster
          roster={this.props.roster}
          tokens={this.props.tokens}
          onPlayerClick={this.props.onPlayerClick}
        />
      </div>
    );
  }
}
Overlay.propTypes = {
  selectedTool: PropTypes.string,
  onToolbarOptionClick: PropTypes.func,
  onPlayerClick: PropTypes.func,
  roster: PropTypes.object,
  tokens: PropTypes.array,
  setPlayer: PropTypes.func,
  setRoster: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
