import { useEffect, useState } from 'react';
import './App.css';

//IMPORT CANDIES IMAGES
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

const baseWidth = 8
const candyColors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy]

export default function App() {
  //USE STATE DEFINITIONS
  const [currentColorBoard, setCurrentColorBoard] = useState([])
  const [squareDragged, setSquareDragged] = useState(null)
  const [squareReplaced, setSquareReplaced] = useState(null)

  //CHECK CANDIES FUNCTIONS
  const checkColumnFour = () => {
    for(let i = 0; i <= 39; i++) {
      const columnFour = [i, i + baseWidth, i + baseWidth * 2, i + baseWidth * 3]
      const currentColorCase = currentColorBoard[i]
    
      if(columnFour.every(square => currentColorBoard[square] === currentColorCase)) {
        columnFour.forEach(square => currentColorBoard[square] = blank)
        return true
      }
    }
  }

  const checkRowFour = () => {
    for(let i = 0; i < 64; i++) {
      const rowFour = [i, i + 1, i + 2, i + 3]
      const notValideCase = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const currentColorCase = currentColorBoard[i]

      if(notValideCase.includes(i)) continue

      if(rowFour.every(square => currentColorBoard[square] === currentColorCase)) {
        rowFour.forEach(square => currentColorBoard[square] = blank)
        return true
      }
    }
  }

  const checkColumnThree = () => {
    for(let i = 0; i <= 47; i++) {
      const columnThree = [i, i + baseWidth, i + baseWidth * 2]
      const currentColorCase = currentColorBoard[i]
    
      if(columnThree.every(square => currentColorBoard[square] === currentColorCase)) {
        columnThree.forEach(square => currentColorBoard[square] = blank)
        return true
      }
    }
  }

  const checkRowThree = () => {
    for(let i = 0; i < 64; i++) {
      const rowThree = [i, i + 1, i + 2]
      const notValideCase = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const currentColorCase = currentColorBoard[i]

      if(notValideCase.includes(i)) continue

      if(rowThree.every(square => currentColorBoard[square] === currentColorCase)) {
        rowThree.forEach(square => currentColorBoard[square] = blank)
        return true
      }
    }
  }

  // MOVE CANDIES FUNCTION
  const moveDownSquare = () => {
    for(let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if(isFirstRow && currentColorBoard[i] === blank)
        currentColorBoard[i] = candyColors[Math.floor(Math.random() * candyColors.length)]

      if(currentColorBoard[i + baseWidth] === blank) {
        currentColorBoard[i + baseWidth] = currentColorBoard[i]
        currentColorBoard[i] = blank
      }
    }
  }

  //DRAG FUNCTIONS
  const dragStart = (e) => {
    setSquareDragged(e.target)
  }

  const dragDrop = (e) => {
      setSquareReplaced(e.target)
  }

  const dragEnd = () => {
    const squareDraggedId = parseInt(squareDragged.getAttribute('data-id'))
    const squareReplacedId = parseInt(squareReplaced.getAttribute('data-id'))

    currentColorBoard[squareReplacedId] = squareDragged.getAttribute('src')
    currentColorBoard[squareDraggedId] = squareReplaced.getAttribute('src')

    const validMoves = [squareDraggedId - 1, squareDraggedId - baseWidth, squareDraggedId + 1, squareDraggedId + baseWidth]
    const validMove = validMoves.includes(squareReplacedId)
    
    const isColumnFour = checkColumnFour()
    const isRowFour = checkRowFour()
    const isColumnThree = checkColumnThree()
    const isRowThree = checkRowThree()

    if(squareReplacedId && validMove && (isColumnFour || isRowFour || isColumnThree || isRowThree)) {
      setSquareDragged(null)
      setSquareReplaced(null)
    } else {
      currentColorBoard[squareReplacedId] = squareReplaced.getAttribute('src')
      currentColorBoard[squareDraggedId] = squareDragged.getAttribute('src')
      
      squareDragged.style.animation = 'falseMoveAnimation 1s'
      setTimeout(() => {
        squareDragged.style.animation = 'none'
      }, 2200)

      setCurrentColorBoard([...currentColorBoard])
    }
  }

  //CREATE BOARD GAME FUNCTION
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
      moveDownSquare()
      setCurrentColorBoard([...currentColorBoard])
    }, 200)
    return () => clearInterval(timer)
  }, [checkColumnFour, checkRowFour, checkColumnThree, checkRowThree, moveDownSquare, currentColorBoard])

  return (
    <div className="App">
      <div className="game_container">
        {currentColorBoard.map((candyColor, index) => (
          <img 
            src={candyColor}
            style={{animation: 'none'}}
            alt={'fruit_' + index} 
            key={index} 
            data-id={index} 
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
}
