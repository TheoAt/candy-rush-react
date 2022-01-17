import { useEffect } from 'react/cjs/react.development';
import { useState } from 'react';
import './ScoreBoard.css'

const ScoreBoard = () => {
    const [currentScore, setCurrentScore] = useState();
    const [bestScore, setBestScore] = useState();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentScore(localStorage.getItem('current_score'))
            setBestScore(localStorage.getItem('best_score'))
        }, 200)
        return () => clearInterval(timer)
    }, [bestScore, currentScore])

    return (
        <div className='score_board'>
            <div className="title_container">
                <h1 className="game_title">Candy Rush ReactJS</h1>
            </div>

            <h2 className="best_score">
                Meilleur score : {bestScore}
            </h2>
            
            <h3 className="current_score">
                Score actuel : {currentScore}
            </h3>
        </div>
    )
}

export default ScoreBoard