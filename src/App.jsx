import { useEffect, useState } from 'react';
import './App.css';

const baseWidth = 8
const candyColors = ['blue', 'red', 'green', 'orange', 'purple', 'yellow']

export default function App() {
  const [currentColorBoard, setCurrentColorBoard] = useState([])

  const checkColumnFour = () => {
    for(let i = 0; i < 39; i++) {
      const columnFour = [i, i + baseWidth, i + baseWidth * 2, i + baseWidth * 3]
      const currentColorCase = currentColorBoard[i]
    
      if(columnFour.every(square => currentColorBoard[square] === currentColorCase)){
        columnFour.forEach(square => currentColorBoard[square] = '')
      }
    }
  }

  const checkRowFour = () => {
    for(let i = 0; i < 64; i++) {
      const rowFour = [i, i + 1, i + 2, i + 3]
      const notValideCase = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const currentColorCase = currentColorBoard[i]

      if(notValideCase.includes(i)) continue

      if(rowFour.every(square => currentColorBoard[square] === currentColorCase)){
        rowFour.forEach(square => currentColorBoard[square] = '')
      }
    }
  }

  const checkColumnThree = () => {
    for(let i = 0; i < 47; i++) {
      const columnThree = [i, i + baseWidth, i + baseWidth * 2]
      const currentColorCase = currentColorBoard[i]
    
      if(columnThree.every(square => currentColorBoard[square] === currentColorCase)){
        columnThree.forEach(square => currentColorBoard[square] = '')
      }
    }
  }

  const checkRowThree = () => {
    for(let i = 0; i < 64; i++) {
      const rowThree = [i, i + 1, i + 2]
      const notValideCase = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const currentColorCase = currentColorBoard[i]

      if(notValideCase.includes(i)) continue

      if(rowThree.every(square => currentColorBoard[square] === currentColorCase)){
        rowThree.forEach(square => currentColorBoard[square] = '')
      }
    }
  }

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

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnFour()
      checkRowFour()
      checkColumnThree()
      checkRowThree()
      setCurrentColorBoard([...currentColorBoard])
    }, 100)
    return () => clearInterval(timer)
  }, [checkColumnFour, checkRowFour, checkColumnThree, checkRowThree, currentColorBoard])

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
