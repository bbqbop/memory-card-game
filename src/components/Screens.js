import React from 'react';

export function WinScreen({nextLevel}){

    return (
      <div className="winScreen">
        <h1>YOU WIN</h1>
        <button onClick={nextLevel}>Continue</button>
      </div>
    )
  }

  export function GameOverScreen({restart, newHighScore}){
    return(
        <div className="gameOverScreen">
            GAME OVER! 
            {newHighScore && <h2>New High Score</h2>}
            <button onClick={restart}>Restart</button>
        </div>
    )
}