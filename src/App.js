import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import dinoIcons from './_dinoIcons';
import GameContext from './_gameContext';
import Logo from './components/Logo';
import Card from './components/Card';
import Score from './components/Score';
import { WinScreen, GameOverScreen } from './components/Screens';
import Footer from './components/Footer';


export const App = () => {
  const [level, setLevel] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighscore] = useState(false);
  const [dinoSet, setDinoSet] = useState(createDinoSet());
  const [order, setOrder] = useState([0,1]);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function createDinoSet(num = level + 1) {
    const set = [];
    while(set.length < num){
      const index = Math.floor(Math.random() * Object.keys(dinoIcons).length) 
      if(set.includes(dinoIcons[index])){
        continue
      } else {
        set.push(dinoIcons[index])
      }
    }
    return set;
  }

  function shuffledIndices() {
    const indices = [];
    while(indices.length < dinoSet.length){
      const index = Math.floor((Math.random() * dinoSet.length))
      if(indices.includes(index)){
        continue
      } else {
        indices.push(index);
      }
    }
    setOrder(indices);
  }

  useEffect(() => {
      handleUpdate();
  });

  function handleUpdate(){
    if (clickCount >= dinoSet.length) {
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
  }

  function triggerNextLevel(){
    setDinoSet(createDinoSet());
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
    setDinoSet(createDinoSet(2));
  }

  function animateBody() {
    const body = document.querySelector('.body');
    body.classList.toggle('fadeout');
  }

  return (
    <> 
    <div className='header'>
        <Logo logo={dinoIcons[0]}/>
        <Score currentScore = {score + clickCount} highScore = {highScore}/>
      </div>
      <div className='body'>
        <GameContext.Provider value={{ setGameOver, setClickCount }}>
          { gameOver 
            ? <GameOverScreen restart={triggerRestart} newHighScore={newHighScore}/>
            : win
            ? <WinScreen nextLevel={triggerNextLevel}/>
            : 
            order.map(idx => (
            <Card src={dinoSet[idx]} shuffle={shuffledIndices} key={dinoSet.indexOf(dinoSet[idx])} />
          ))}
        </GameContext.Provider>
      </div>
      <Footer />
    </>
  )
}






