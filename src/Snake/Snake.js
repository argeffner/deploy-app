import React from "react";
import Board from '../board/SnakeBoard';
import { Link } from 'react-router-dom'; 
import PlayMusic from "../retro-music/PlayMusicSnake";

import './Snake.css';

function SnakeGame() {
  return (
      <div className='Snake-app'>
        <PlayMusic />
        <Board/>
        <Link className="Arcade-return" to="/">
				Go Back to Arcade Screen
				</Link>
      </div>
  );
}

export default SnakeGame;