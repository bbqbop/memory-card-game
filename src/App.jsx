import './App.css';
import React, { useState, useEffect } from 'react';
import GameContext from './_gameContext';
import Logo from './components/Logo';
import Card from './components/Card';
import Score from './components/Score';
import { WinScreen, GameOverScreen } from './components/Screens';
import Footer from './components/Footer';


function App (){
  const [level, setLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighscore] = useState(false);
  const [dinoSet, setDinoSet] = useState([]);
  const [order, setOrder] = useState([0,1]);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const iconsUrl = "https://dino-api.adaptable.app/icons"
  
  useEffect(()=>{
      fetch(`${iconsUrl}?num=${level + 1}`)
      .then(res => res.json())
      .then((data)=>{
        setDinoSet(data.icons)
      })
      .catch(err => {
        console.log(err)
      })
    },[level])
  

  function shuffledIndices() {
    const indices = new Set();
    while(indices.size < dinoSet.length){
      const index = Math.floor((Math.random() * dinoSet.length))
      indices.add(index)
    }
    setOrder(Array.from(indices));
  }

  useEffect(() => {
    if (clickCount >= level + 1) {
      setWin(true);
      setScore(prev => prev + clickCount);
      setClickCount(0);
      setLevel(prev => prev + 1);
    } else if (gameOver) {
      const finalScore = score + clickCount;

      if (finalScore >= highScore) {
        setNewHighscore(true);
        setHighScore(finalScore);
      }
    }
  },[clickCount, gameOver])
  

  function triggerNextLevel(){
    setOrder(prevOrder => {
      const array = [...prevOrder];
      array.push(level);
      return array;
    });
    setWin(false)
  };

  function triggerRestart(){
    setGameOver(false);
    setNewHighscore(false);
    setClickCount(0);
    setScore(0);
    setLevel(1);
    setOrder([0,1]);
  }

  return (
    <> 
    <div className='header'>
        <Logo logo={`${iconsUrl}/001-dinosaur.png`}/>
        <Score currentScore = {score + clickCount} highScore = {highScore}/>
      </div>
      <div className='body'>
        <GameContext.Provider value={{ setGameOver, setClickCount, iconsUrl }}>
          { gameOver 
            ? <GameOverScreen restart={triggerRestart} newHighScore={newHighScore}/>
            : win
            ? <WinScreen nextLevel={triggerNextLevel}/>
            : 
            order.map(idx => (
            <Card src={dinoSet[idx]} shuffle={shuffledIndices} key={idx} />
          ))}
        </GameContext.Provider>
      </div>
      <Footer />
    </>
  )
}

export default App




