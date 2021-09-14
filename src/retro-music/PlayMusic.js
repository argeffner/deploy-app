import React, {useState, useEffect} from 'react';
import RType from './R-type.mp3';

function PlayMusic() {

  const [audio] = useState(new Audio(RType));
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
      <button className='music' onClick={toggle}>{playing ? "Pause music" : "Play music"}</button>
    </div>
  );
}

export default PlayMusic;