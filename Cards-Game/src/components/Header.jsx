function Header({ currentScore, highScore }) {
  return (
    <header className="header">
      <h1>Pokémon Memory Game</h1>
      <div className="scoreboard">
        <p>Current Score: {currentScore}</p>
        <p>High Score: {highScore}</p>
      </div>
    </header>
  );
}

export default Header;