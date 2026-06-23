import { useState, useEffect } from 'react';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCardIds, setClickedCardIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // 1. The Shuffle Logic
  const shuffleCards = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // 2. The PokeAPI Fetching Logic
  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Fetching 12 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
        
        // PokeAPI gives a list of names and URLs. We map them to an easier format.
        const formattedCards = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          // This URL gives us a nice high-quality official image of each Pokémon
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
        }));

        setCards(shuffleCards(formattedCards)); // Shuffle them right when they load!
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  // 3. The Click Handler Logic
  const handleCardClick = (id) => {
    if (!clickedCardIds.includes(id)) {
      setClickedCardIds([...clickedCardIds, id]);
      setCurrentScore((prevScore) => prevScore + 1);
      setCards((prevCards) => shuffleCards(prevCards));
    } else {
      if (currentScore > highScore) {
        setHighScore(currentScore);
      }
      setCurrentScore(0);
      setClickedCardIds([]);
      setCards((prevCards) => shuffleCards(prevCards));
    }
  };

  // 4. The Render Layout
  return (
    <div className="App">
      <Header currentScore={currentScore} highScore={highScore} />
      {/* We pass the cards AND the click function down */}
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
}

export default App;