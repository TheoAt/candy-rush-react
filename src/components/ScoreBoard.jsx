import './ScoreBoard.css'

const ScoreBoard = ({score}) => {
    return (
        <div className='score_board'>
            <h2 className="score">
                {score}
            </h2>
        </div>
    )
}

export default ScoreBoard