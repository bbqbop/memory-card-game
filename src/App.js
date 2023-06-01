import './App.css';
import React, { useState, useContext } from 'react';
import GameOverContext from './components/gameOverContext';
require.context('./icons', false, /\.(png|jpe?g|svg)$/)

function importAll(r) {
  let images = {};
   r.keys().forEach((item, index) => { images[index] = r(item); });
  return images
 }
const dinos = importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/));



export const App = () => {
  const [dinoSet, setDinoSet] = useState(createDinoSet(3))
  const [order, setOrder] = useState([0,1,2])
  const [gameOver, setGameOver] = useState(false);

  function createDinoSet(num) {
    const set = [];
    while(set.length < num){
      const index = Math.floor(Math.random() * Object.keys(dinos).length) 
      if(set.includes(dinos[index])){
        continue
      } else {
        set.push(dinos[index])
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

  return (
    <div> 
      <GameOverContext.Provider value={{ gameOver, setGameOver }}>
        {gameOver ? <div>GAMEOVER</div> : 
          order.map(idx => (
           <Card src={dinoSet[idx]} shuffle={shuffledIndices} key={dinoSet.indexOf(dinoSet[idx])} />
         ))}
      </GameOverContext.Provider>
    </div>
  )
}

function Card( {src, shuffle} ){
  const [isClicked, setIsClicked] = useState(false);
  const {setGameOver} = useContext(GameOverContext);

  function handleClick(){
    isClicked === false ? setIsClicked(true) : setGameOver(true);
    shuffle();
  }

  return (
    <div className="card">
      <img src={src} onClick={handleClick} alt="Dino-Card"/>
    </div>
  )

}


