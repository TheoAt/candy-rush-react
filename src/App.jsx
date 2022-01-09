import { useEffect, useState } from 'react';
import './App.css';

const baseWidth = 8
const candyColors = ['blue', 'red', 'green', 'orange', 'purple', 'yellow']

export default function App() {
  const [currentColorBoard, setCurrentColorBoard] = useState([])

  const createBoard = () =>  {
    const colorsTab = []
    for(let i = 0; i < baseWidth * baseWidth; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      colorsTab.push(randomColor)
    }
    setCurrentColorBoard(colorsTab)
  }

  useEffect(() => {
    createBoard()
  }, [])

  return (
    <div className="App">
      <div className="game_container">
        {currentColorBoard.map((candyColor, index) => (
          <img style={{backgroundColor: candyColor}} alt={candyColor+'_fruit'} key={index} />
        ))}
      </div>
    </div>
  );
}
