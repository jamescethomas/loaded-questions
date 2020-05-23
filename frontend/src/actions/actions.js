/*
 * action types
 */
export const SET_GAME_STATE = 'SET_GAME_STATE'
export const SET_PLAYERLESS_GAME_STATE = 'SET_PLAYERLESS_GAME_STATE'

/*
 * action creators
 */
export function setGameState(gameState) {
  return { type: SET_GAME_STATE, gameState }
}

export function setPlayerlessGameState(playerlessGameState) {
  return { type: SET_PLAYERLESS_GAME_STATE, playerlessGameState }
}
