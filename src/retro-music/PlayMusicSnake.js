import React, {useState, useEffect} from 'react';
import SnakeTheme from './SnakeTheme.mp3';

function PlayMusic() {

  const [audio] = useState(new Audio(SnakeTheme));
  const [playing, setPlaying] = useState(true);  

  const toggle = () => { 
    setPlaying(!playing); 
    audio.loop = true;
  }

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing, audio]
  );  
  
  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
      audio.pause();
    };
  }, [audio]);
    
  return (
    <div>
      <button className='music-snake' onClick={toggle}>{playing ? "Pause music" : "Play music"}</button>
    </div>
  );
}

export default PlayMusic;