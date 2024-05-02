export default function Score ({currentScore, highScore}){
    return (
        <div className="score">
            <p>Current Score : <strong>{currentScore}</strong></p>
            <p>High Score : <strong>{highScore}</strong></p>
        </div>
    )
}