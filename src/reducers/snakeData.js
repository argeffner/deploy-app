import { LOAD_SNAKE_ALL } from "../actions/types";

const INITIAL_STATE = [];

/**
 * Reducer for the Snakegame score 
 * Passes the score Loading action
 */

function allSnakeScores(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_SNAKE_ALL:
      return action.payload;
    
    default:
      return state;
  }
}

export default allSnakeScores;