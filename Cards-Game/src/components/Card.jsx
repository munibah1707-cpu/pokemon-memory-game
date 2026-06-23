function Card({ card, onCardClick }) {
  return (
    <div className="card" onClick={() => onCardClick(card.id)}>
      <img src={card.image} alt={card.name} />
      <h3>{card.name}</h3>
    </div>
  );
}

export default Card;