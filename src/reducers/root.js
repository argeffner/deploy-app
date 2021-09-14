import { combineReducers } from "redux";
import maxSnakeScore from "./maxSnake";
import allSnakeScores from './snakeData';
import newSnakeScores from './postSnake';
// import maxPacScore from "./pacData";


/**
 * separate file the combines all the reducers to be used for the store
 */

export default combineReducers({
  maxSnakeScore,
  allSnakeScores,
  newSnakeScores,
  // maxPacScore
}); 