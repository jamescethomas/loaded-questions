import Cookies from 'universal-cookie';
import config from '../config.js';

import { combineReducers } from 'redux'
import {
  SET_GAME_STATE,
  SET_PLAYERLESS_GAME_STATE,
} from '../actions/actions.js'

function gameState(state = [], action) {
  const cookies = new Cookies();

  switch (action.type) {
    case SET_GAME_STATE:
      state = action.gameState;
      // Save the user in the cookies
      cookies.set(config.APP_NAME + '-user', state, { path: '/' });
      return state;
    case SET_PLAYERLESS_GAME_STATE:
      var tempState = state
      tempState.game = action.playerlessGameState.game;
      tempState.players = action.playerlessGameState.players;

      // Set the player's state
      for (var i = 0; i < tempState.players.length; i++) {
        if (tempState.player.token === tempState.players[i].token) {
          tempState.player.role = tempState.players[i].role;
          break;
        }
      }

      cookies.set(config.APP_NAME + '-user', tempState, { path: '/' });
      return {
        game: action.playerlessGameState.game,
        players: action.playerlessGameState.players,
        player: tempState.player
      }
    default:
      return state;
  }
}

const reducers = combineReducers({
  gameState
})

export default reducers
