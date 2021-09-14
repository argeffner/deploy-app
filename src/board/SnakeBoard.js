import {useState, useEffect, useRef} from 'react';
// import ArcadeScores from '../Api';
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  MAX_SCORE
      } from '../Snake/InitialData';
import {useInterval} from '../Snake/Interval';
import './SnakeBoard.css';
import Apple from '../gameImages/apple.png';
import ScoreForm from '../NewScoreForm';
import { useSelector, useDispatch } from "react-redux";
import { getSnake } from "../actions/maxSnake";
import { addSnake } from "../actions/postSnake";

function SnakeBoard() {
  let myhighscore = localStorage.getItem("myhighscore") || 0;
  const maxScore = useSelector(st => st.maxSnakeScore);
  const dispatch = useDispatch();

  const canvasRef = useRef();
  const wrapperRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [stillPlaying, setStillPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [forcedFinish, setForcedFinish] = useState(false);
  const [myHighScore, setMyHighScore] = useState(0);


  // useEffect for getting highscore data from API
  // Old way using useState
  useEffect(() => {
    dispatch(getSnake())
  }, [dispatch, maxScore]);


  // useEffect hook for moving snake
  useInterval(() => theSnake(), speed);


  // Pass new data into API and update current score data
    const add =  (newScore) => {
			dispatch(addSnake(newScore));
      // console.log(newScore);
		}


  // End the game 
  const endGame = () => {
    let myhighest = (score > myHighScore) ? score : myHighScore;
    localStorage.setItem('myhighscore', myhighest);
    setMyHighScore(myhighest);
    setSpeed(null);
    setGameOver(true);
    setStillPlaying(false);
  };


  // gets keycodes from directions 
  const moveSnake = (e) => {
    const { keyCode } = e;
    if ( keyCode === 38 || keyCode === 40 || keyCode === 37 || keyCode === 39 ) {
      // disables reverse key from causing collision (right-left, up-down don't end game)
      // logic truthy or falsy if there is any 0 then it's false otherwise true and move to new direction.
      if (
        dir[0] + DIRECTIONS[keyCode][0] && dir[1] + DIRECTIONS[keyCode][1]
      ){
        setDir(DIRECTIONS[keyCode]);
      }
    }
    ;
  };


  // create a randomized location for the apple (scale item from canvas size)
  const createApple = () =>
    apple.map((a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));
    

  // checks if snake hit itself or if it went out of bounds
  const checkCollision = (cell, s=snake) => {
      // Wall Collision Detection
      if (
        cell[0] * SCALE >= CANVAS_SIZE[0] ||
        cell[0] < 0 ||
        cell[1] * SCALE >= CANVAS_SIZE[1] ||
        cell[1] < 0
      ) return true;
      // need to use for-of and not for-in
      for (const segment of s) {
        if (cell[0] === segment[0] && cell[1] === segment[1]) return true; 
      }
      return false;
  };


  // check if apple is devoured by snake
  const checkEatApple = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      // need to check if apple is out of bounds
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      // count score each time apple is devoured
      setScore(score + 1);
      // Ends game if max score is reached
      if (score === MAX_SCORE) {
        setForcedFinish(true);
        endGame();
      }
      setApple(newApple);
      return true;
    }
    return false;
  }
  

  // establish initial settings for start of game
  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setStillPlaying(true);
    setScore(0);
    setForcedFinish(false);
    setMyHighScore(myhighscore);
    wrapperRef.current?.focus();
  };
  

  // build the snake throughout moving and eating. Every added movement changes 
  const theSnake = () => {
    const snakeCopy = [...snake];
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    // add to front for movement or direction change
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    // if it doesn't eat apple don't add extra segment 
    // thus deleting the end for movement or direction change
    if (!checkEatApple(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };


  // useEffect for setting initial game board
  useEffect(() => {
    let ap = Apple;
    let Sapple = new Image();
    Sapple.src = ap;
    // draw the canvas
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    // snake drawing part
    context.fillStyle = "green";
    snake.forEach(function([x, y]) {context.fillRect(x, y, 1, 1)});
    // apple drawing part
    context.fillStyle = "light-green";
    // circle surrounds the apple for better visual
    let circle = new Path2D();
    circle.arc(apple[0]+0.5, apple[1]+0.5, 0.5, 0, 2*Math.PI);
    context.fill(circle);
    // draw the apple
    context.drawImage(Sapple, apple[0], apple[1], 1, 1)
  }, [snake, apple, gameOver]);


  // disable arrow key scrolling 
  // code from stackoverflow
  window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
  }, false);
  

  // force reload function for adding data to correct minor bug 
  // which only fixes async data after refreshing the page 
  // redux didn't fix issue even when redux state is updated
  function refresh() {
    window.location.reload(false);
  }

  
  return (
    <div className="wrapper">
    <h1 className='title'>Classic Snake Game</h1>
    <p className="score">Score: {score}</p>
    <div
      ref={wrapperRef}
      className="canvas"
      role="button" 
      tabIndex="0" 
      onKeyDown={e => moveSnake(e)}
    >
      <canvas
        style={
          gameOver ? { border: '3px solid black', opacity: 0.3 }
                   : {border:'3px solid purple', boxShadow: "0 0 7px #fff, 0 0 13px #fff, 0 0 21px #fff"}
        }
        ref={canvasRef}
        width={CANVAS_SIZE[0]}
        height={CANVAS_SIZE[1]}
      />
      {forcedFinish && <p className="finished-game">Congratulations, You're a Maniac.</p>}
      {gameOver 
      ? <div className="game-over" data-testid="game-over">Game Over 
          <div className="high-score" data-testid="highscore-end">
            <h4>High-Score: {(score > maxScore) ? score : maxScore}</h4>
            <h4>My High-Score: {myHighScore}</h4>
          </div> 
          {score > maxScore 
           ? <ScoreForm className='form' add={add} score={score} forAPI={refresh}
              style={{fontSize: '25px'}}/>
           : <p className='not-form'> You can do better</p>
          }     
        </div> 
      : <div className="new-game" data-testid="new-game">New Game 
          <div className="high-score" data-testid="highscore-start">
            <h4>High-Score: {maxScore}</h4>
            <h4>My High-Score: {myHighScore}</h4>
          </div> 
        </div>
      }
      {!stillPlaying && (
                <button className='start' 
                        data-testid="start"
                        onClick={startGame}>
                          Start Game
                </button>
      )}
      
    </div>
  </div>
  ); 
}

export default SnakeBoard; 
