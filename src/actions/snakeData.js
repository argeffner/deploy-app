import { LOAD_SNAKE_ALL } from "./types";
import ArcadeScores from "../Api"
// import {ArcadeScores1} from "../frontAPI"

/** GetSnake
 * 
 * action route used for dispatching highest score data for Snake game 
 * 
 * gets data of snake in the Database 
 * 
 */

//  function getAllSnake() {
//   return async function (dispatch) {
//     let snakeData = await ArcadeScores1.getSnake();
//     let allScores = snakeData;
//     dispatch(gotAllScores(allScores))
//   }
// }

function getAllSnake() {
  return async function (dispatch) {
    const result = await ArcadeScores.getSnake();
    let allScores = result;
    dispatch(gotAllScores(allScores))
  };
}

function gotAllScores(allScores) {
  return { type: LOAD_SNAKE_ALL, payload: allScores };
}


export { getAllSnake }