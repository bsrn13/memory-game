import "./Cards.css";

export default function Cards({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) { // default deger false, disabled true ise diger kartlara tiklama yapilmasin
            handleChoice(card)
        }
    }

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="card-front " src={card.src} alt="card front" />
        <img className="card-cover " 
        src="/img/cover.jpeg" 
        alt="card cover" 
        onClick={handleClick}
        />
      </div>
    </div>
  );
}
