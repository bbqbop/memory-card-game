import { useState, useContext } from "react";
import GameContext from "../_gameContext";

export default function Card( {src, shuffle} ){
    const [isClicked, setIsClicked] = useState(false);
    const {setGameOver, setClickCount, iconsUrl} = useContext(GameContext);
  
    async function handleClick(){

        if(isClicked === false){
            setIsClicked(true);
            setClickCount(prev => prev + 1)
            shuffle();
        } else {
            setGameOver(true);
        }};
  
    return (
      <div className="card">
        <img src={`${iconsUrl}/${src}`} onClick={handleClick} alt="Dino-Card"/>
      </div>
    );
  }