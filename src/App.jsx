import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import './App.css';

export default function App() {
  // const [currentScore, setCurrentScore] = useState();

  // useEffect(() => {
  //   setCurrentScore(localStorage.getItem('current_score'))
  // }, [])

  return (
    <div className="App">
      <ScoreBoard />
      <GameBoard />
    </div>
  );
}
