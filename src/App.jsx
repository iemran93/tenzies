import { useState } from "react"
import Dice from "./Dice"

function App() {
  const width = 5,
    height = 2

  const [numbers, setNumbers] = useState(
    Array(width * height)
      .fill()
      .map(() => Math.floor(Math.random() * 10))
  )

  const [frozenDice, setFrozenDice] = useState(
    Array(width * height).fill(false)
  )

  const [gameDone, setGameDone] = useState(false)

  const rollDice = () => {
    setNumbers((prevNumbers) => {
      return prevNumbers.map((num, i) =>
        frozenDice[i] ? num : Math.floor(Math.random() * 10)
      )
    })
  }

  const toggleFreeze = (index) => {
    if (!gameDone) {
      setFrozenDice((prevFrozen) => {
        let newFrozen = [...prevFrozen]
        newFrozen[index] = !newFrozen[index]
        const numbersEqual = numbers.every((value) => value == numbers[0])
        const allFreeze = newFrozen.every((value) => value == true)
        console.log(numbersEqual, allFreeze)
        if (numbersEqual && allFreeze) {
          setGameDone(true)
        }
        return newFrozen
      })
    }
  }

  const resetGame = () => {
    setNumbers(
      Array(width * height)
        .fill()
        .map(() => Math.floor(Math.random() * 10))
    )
    setFrozenDice(Array(width * height).fill(false))
    setGameDone(false)
  }

  const dices = []
  let diceIndex = 0

  for (let row = 0; row < height; row++) {
    const rowDiv= []
    for (let col = 0; col < width; col++) {
      const currentIndex = diceIndex
      rowDiv.push(
        <Dice
          key={diceIndex}
          number={numbers[diceIndex]}
          isFreeze={frozenDice[currentIndex]}
          onFreeze={() => toggleFreeze(currentIndex)}
        />
      )
      diceIndex++
    }
    dices.push(<div key={`row ${row}`} className="row">{rowDiv}</div>)
    dices.push(<br key={`br${diceIndex}`}></br>)
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p> Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </p>
      <div className="dices">
      {dices}
      </ div>
      {gameDone ? (
        <button onClick={resetGame}>Reset Game</button>
      ) : (
        <button onClick={rollDice}>Roll</button>
      )}
    </main>
  )
}

export default App
