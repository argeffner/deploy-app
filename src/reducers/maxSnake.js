import { LOAD_SNAKE } from "../actions/types";

const INITIAL_STATE = 0;

/**
 * Reducer for the Snakegame score 
 * Passes the score Loading action
 */

function maxSnakeScore(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_SNAKE:
      return action.payload;
    default:
      return state;
  }
}

export default maxSnakeScore;