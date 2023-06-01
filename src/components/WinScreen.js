import React from 'react';

export default function WinScreen({nextLevel}){

    return (
      <div className="winScreen">
        <h1>YOU WIN</h1>
        <button onClick={nextLevel}>Continue</button>
      </div>
    )
  }