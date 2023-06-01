import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import dinoIcons from './_dinoIcons';
import GameOverContext from './components/gameOverContext';
import Card from './components/Card';
import WinScreen from './components/WinScreen';

export const App = () => {
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [dinoSet, setDinoSet] = useState(createDinoSet(level));
  const [order, setOrder] = useState([0,1,2]);
  const [clickCount, setClickCount] = useState(0);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function createDinoSet(num) {
    const set = [];
    while(set.length < num + 2){
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
    setClickCount(prevCount => prevCount + 1);
    setOrder(indices);
  }

  useEffect(() => {
    if (clickCount >= dinoSet.length){
      setWin(true);
      setHighScore(clickCount);
      setClickCount(0);
      setLevel(prev => prev + 1);
    }
  },[clickCount, dinoSet, level, highScore])

  function startNextLevel(){
    setDinoSet(createDinoSet(level));
    setOrder(prevOrder => {
      const array = [...prevOrder];
      array.push(level + 1);
      return array;
    });
    setWin(false)
  }

  return (
    <div> 
      <GameOverContext.Provider value={{ gameOver, setGameOver }}>
        {gameOver 
          ? <div>GAMEOVER</div> 
          : win
          ? <WinScreen nextLevel={startNextLevel}/>
          : 
          order.map(idx => (
           <Card src={dinoSet[idx]} shuffle={shuffledIndices} key={dinoSet.indexOf(dinoSet[idx])} />
         ))}
      </GameOverContext.Provider>
    </div>
  )
}






