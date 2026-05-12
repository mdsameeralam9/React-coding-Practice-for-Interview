import React, { useEffect, useState } from "react";

const cardsData = ["🍎", "🍌", "🍇", "🍒", "🍎", "🍌", "🍇", "🍒"];

export default function MemoryGameLayout() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Shuffle cards on initial render
  useEffect(() => {
    shuffleCards();
  }, []);

  // Shuffle Function
  const shuffleCards = () => {
    const shuffled = [...cardsData]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        value: item,
      }));

    setCards(shuffled);
  };

  // Card Click
  const handleCardClick = (card) => {
    // Prevent clicking more than 2 cards
    if (flippedCards.length === 2) return;

    // Prevent clicking same card again
    if (flippedCards.includes(card.id)) return;

    // Prevent clicking matched card
    if (matchedCards.includes(card.value)) return;

    const updatedFlipped = [...flippedCards, card.id];

    setFlippedCards(updatedFlipped);

    // When 2 cards selected
    if (updatedFlipped.length === 2) {
      const firstCard = cards.find((item) => item.id === updatedFlipped[0]);

      const secondCard = cards.find((item) => item.id === updatedFlipped[1]);

      // Match Found
      if (firstCard.value === secondCard.value) {
        setMatchedCards((prev) => [...prev, firstCard.value]);

        setFlippedCards([]);
      } else {
        // Flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Memory Game</h1>

      <div style={styles.grid}>
        {cards.map((card) => {
          const isFlipped =
            flippedCards.includes(card.id) || matchedCards.includes(card.value);

          return (
            <div
              key={card.id}
              style={styles.card}
              onClick={() => handleCardClick(card)}
            >
              {isFlipped ? card.value : "?"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 80px)",
    gap: "10px",
    justifyContent: "center",
  },

  card: {
    width: "80px",
    height: "80px",
    background: "#3498db",
    color: "white",
    fontSize: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    cursor: "pointer",
    userSelect: "none",
  },
};
