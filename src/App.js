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
  const [disabled, setDisabled] = useState(false);

  let highScore = localStorage.getItem(`high-score`);

  //card shuffle
  const cardShuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);

    saveStorage();
  };

  //localstorage functions
  function saveStorage() {
    let highScore = localStorage.getItem(`high-score`);
    if (highScore > turns && turns !== 0) {
      localStorage.setItem(`high-score`, turns);
    }
  }
  // console.log(cards, turns);

  // handle choice
  const handleChoice = (card) => {
    // console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        // console.log('MATCH!')
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCard();
      } else {
        //  console.log("dont match");
        setTimeout(() => {
          resetCard();
        }, 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // oyunu otomatik baslat
  useEffect(() => {
    if (!localStorage.getItem(`high-score`)) {
      localStorage.setItem(`high-score`, 999);
    }
    cardShuffle();
  }, []);
  // console.log(cards);

  // console.log( choiceOne, choiceTwo)
  // console.log(turns)

  const resetCard = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((turn) => turn + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={cardShuffle}>Restart</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Cards
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <p>High Score: {highScore > 100 ? 0 : highScore}</p>
    </div>
  );
}

export default App;
