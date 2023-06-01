import { useState, useContext } from "react";
import GameOverContext from "./gameOverContext";

export default function Card( {src, shuffle} ){
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