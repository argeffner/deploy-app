import { CREATE_NEW_SNAKE } from "../actions/types";

const INITIAL_STATE = [];

/**
 * Reducer for the Snakegame score 
 * Passes the score Loading action
 */

function newSnakeScores(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_NEW_SNAKE:
      return action.payload;
    
    default:
      return state;
  }
}

export default newSnakeScores;