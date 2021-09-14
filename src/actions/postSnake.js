import { CREATE_NEW_SNAKE } from "./types";
import ArcadeScores from "../Api"
// import ArcadeScores1 from "../frontAPI"

/** GetSnake
 * 
 * action route used for dispatching highest score data for Snake game 
 * 
 * gets data of snake in the Database 
 * 
 */

//  function addSnake(newSnake) {
//   return async function (dispatch) {
//     let snakeData = await ArcadeScores1.addSnake(newSnake);
//     let newsnake = snakeData;
//     dispatch(addNewSnake(newsnake))
//   }
// }

function addSnake(newSnake) {
  return async function (dispatch) {
    let snakeData = await ArcadeScores.addSnake(newSnake);
    let newsnake = snakeData;
    dispatch(addNewSnake(newsnake))
  };
}

function addNewSnake(newsnake) {
  return { type: CREATE_NEW_SNAKE, payload: newsnake };
}


export { addSnake }