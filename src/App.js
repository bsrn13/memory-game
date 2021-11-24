import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards";

const cardImages = [
  { src: "/img/morty.png", matched: false },
  { src: "/img/pngegg.png", matched: false },
  { src: "/img/rick.png", matched: false },
  { src: "/img/showme.png", matched: false },
  { src: "/img/snuffles.png", matched: false },
  { src: "/img/sun.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //card shuffle
  const cardShuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // console.log(cards, turns);

  // handle choice
  const handleChoice = (card) => {
    // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        // console.log('MATCH!')
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          });
        });
        resetCard();
      } else {
        console.log("dont match");
        resetCard();
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards)

  // console.log( choiceOne, choiceTwo)
  // console.log(turns)

  const resetCard = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turn) => turn + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={cardShuffle}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Cards key={card.id} card={card} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
