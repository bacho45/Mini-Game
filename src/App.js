import matchers from '@testing-library/jest-dom/matchers';
import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';



const cardImages = [
  { src : "./img/helmet-1.png", matched: false },
  { src : "./img/potion-1.png", matched: false },
  { src : "./img/ring-1.png", matched: false },
  { src : "./img/scroll-1.png", matched: false },
  { src : "./img/shield-1.png", matched: false },
  { src : "./img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] =useState(0)
  const [choiceOne, setChoiseOne] = useState(null)
  const [choiceTwo, setChoiseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))

    setChoiseOne(null)
    setChoiseTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiseTwo(card) : setChoiseOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() =>  resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)
  
  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffledCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Mach</h1>
      <button onClick={shuffledCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
