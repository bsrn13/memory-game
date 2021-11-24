import "./Cards.css";

export default function Cards({ card, handleChoice }) {

    const handleClick = () => {
        handleChoice(card)
    }

  return (
    <div className="card">
      <div>
        <img className="card-front" src={card.src} alt="card front" />
        <img className="card-cover " 
        src="/img/cover.jpeg" 
        alt="card cover" 
        onClick={handleClick}
        />
      </div>
    </div>
  );
}
