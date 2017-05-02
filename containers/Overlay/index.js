/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../database';

import { selectTool, setPlayer, setRoster } from '../../store/actions';
import { getCurrentToolId, tools } from '../../store/reducers/tool';
import { getRoster, getPlayer } from '../../store/reducers/players';
import { getTokens } from '../../store/reducers/tokens';

import Toolbar from '../../components/Toolbar';
import ToolbarOption from '../../components/ToolbarOption';
import Roster from '../../components/Roster';

function storageAvailable() {
  try {
    const storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

const mapStateToProps = state => ({
  selectedTool: getCurrentToolId(state.tool),
  roster: getRoster(state.players),
  player: getPlayer(state.players),
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
    const playersRef = database.ref('players');
    playersRef.once('value', (snap) => {
      const players = snap.val() || [];
      const playerCount = Object.keys(players).length;

      if (!this.props.player) {
        let myPlayerKey = playerCount;
        let updatedPlayer = {
          connected: true,
        };
        if (storageAvailable()) {
          const storedId = window.localStorage.getItem('direPlayerId');
          if (storedId && snap.hasChild(storedId)) {
            myPlayerKey = parseInt(storedId, 10);
          } else {
            updatedPlayer = {
              connected: true,
              id: myPlayerKey,
              name: `Player ${myPlayerKey}`,
              gm: playerCount < 1,
            };
            window.localStorage.setItem('direPlayerId', myPlayerKey);
          }
        }
        const myPlayerRef = database.ref(`players/${myPlayerKey}`);
        myPlayerRef.update(updatedPlayer);
        myPlayerRef.onDisconnect().update({
          connected: false,
        });
        this.props.setPlayer(myPlayerKey);
      }
    });

    playersRef.on('value', (snap) => {
      const players = snap.val() || [];
      this.props.setRoster(players);
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
  roster: PropTypes.arrayOf(PropTypes.object),
  player: PropTypes.object,
  tokens: PropTypes.array,
  setPlayer: PropTypes.func,
  setRoster: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
