import React, {useState, useEffect} from "react";
import ArcadeScores from './Api';
import { Card, 
         CardBody, 
         CardTitle, 
         CardImg, 
         CardDeck, 
        } from "reactstrap";
import { Link } from 'react-router-dom'; 
// import pacman from './gameImages/pacman.png';
import snake from './gameImages/snake.jpg';
import './Home.css';

function Home() {

  localStorage.clear();

  const [scoreObj, setScoreObj] = useState([]);

//   useEffect for Snake game Scores
  useEffect(() => {
    async function getAPIData() {
      setScoreObj( await ArcadeScores.getSnake());
    }
    getAPIData();
  }, []);
  
  const Players = scoreObj.map((player, index) => {
    return (
      <div key={index}>
        <h3 className='player' data-testid="player">Player: {player.name}</h3>
        <h3 className='highest' data-testid="highest">Highscore: {player.score}</h3>
      </div>
    )
  })

  return (
   <section >
    <h1 className='Title' style={{color: 'white'}}>Arcade Games</h1>
    <CardDeck style={{display: 'flex', justifyContent: 'center'}}>
      <Card className='game1' 
            style={{flex: 1, marginLeft: '-7%'}}
      >
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold" 
                     tag='h3'> 
                     {/* Snake Game */}
          </CardTitle>
          <Link className="Home-info" to="/snake">
            <CardImg className="image"
                     style={{borderRadius: '10px', borderStyle: 'solid'}}
                     src={snake} 
                     alt="Snake-image" />	
		       </Link>
        </CardBody>
      </Card>
      {/* <Card className='game2' style={{flex: 2}}>
        <CardBody className="text-center">
          <CardTitle className="font-weight-bold" 
                     tag='h3'> 
                     
          </CardTitle>
          <Link className="Home-info" to="/pacman">
            <CardImg className="image"
                     style={{borderRadius: '10px', borderStyle: 'solid'}}
                     src={pacman} 
                     alt="PacMan-image" />	
		       </Link>
        </CardBody>
      </Card> */}
    </CardDeck>
    <div className="fade"></div>

    <div className="score-name" data-testid="score-name">
      <div className="crawl">
        <h1 className='snake-game-title' data-testid="snake-game-title">Snake Game</h1>
        {Players}
      </div>
    </div>
   </section>
  );
}

export default Home;
