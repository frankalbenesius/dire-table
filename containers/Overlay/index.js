import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectTool } from '../../store/actions';
import { getCurrentToolId, tools } from '../../store/reducers/tool';
import { getPlayers } from '../../store/reducers/players';
import { getTokens } from '../../store/reducers/tokens';

import Toolbar from '../../components/Toolbar';
import ToolbarOption from '../../components/ToolbarOption';
import PlayerList from '../../components/PlayerList';

const mapStateToProps = state => ({
  selectedTool: getCurrentToolId(state.tool),
  players: getPlayers(state.players).list,
  tokens: getTokens(state.tokens).list,
});

const mapDispatchToProps = dispatch => ({
  onToolbarOptionClick: toolId => dispatch(selectTool(toolId)),
  onPlayerClick: tokenId => dispatch(selectTool('token', tokenId)),
});

const Overlay = ({ selectedTool, players, tokens, onToolbarOptionClick, onPlayerClick }) => (
  <div>
    <Toolbar>
      {tools.map((tool, i) => (
        <ToolbarOption
          key={i}
          icon={tool.icon}
          selected={tool.id === selectedTool}
          onClick={() => onToolbarOptionClick(tool.id)}
        />
      ))}
    </Toolbar>
    <PlayerList players={players} tokens={tokens} onPlayerClick={onPlayerClick} />
  </div>
);
Overlay.propTypes = {
  selectedTool: PropTypes.string,
  onToolbarOptionClick: PropTypes.func,
  onPlayerClick: PropTypes.func,
  players: PropTypes.array,
  tokens: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
