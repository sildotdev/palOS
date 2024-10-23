import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@react95/core';
import { Isign324001 } from '@react95/icons';

interface HackingModalProps {
  onClose: () => void;
}

interface Card {
  id: number;
  icon: string;
}

const ICONS = ['🌟', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸'];
const CARD_PAIRS = [...ICONS, ...ICONS];

const HackingModal: React.FC<HackingModalProps> = ({ onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState(new Set<number>());
  const [matched, setMatched] = useState(new Set<number>());
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffledCards = [...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    setCards(shuffledCards);
  }, []);

  const resetGame = () => {
    setFlipped(new Set());
    setMatched(new Set());
    setMoves(0);
    setDisabled(false);
    const shuffledCards = [...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    setCards(shuffledCards);
  };

  const handleCardClick = (cardId: number) => {
    if (disabled || flipped.has(cardId) || matched.has(cardId)) return;

    const newFlipped = new Set(flipped);
    newFlipped.add(cardId);
    setFlipped(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.size === 2) {
      setDisabled(true);
      const [firstId, secondId] = Array.from(newFlipped);
      if (cards[firstId].icon === cards[secondId].icon) {
        // Create a new Set and add all values using Set.add()
        const newMatched = new Set(matched);
        newMatched.add(firstId);
        newMatched.add(secondId);
        setMatched(newMatched);
        setFlipped(new Set());
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped(new Set());
          setDisabled(false);
        }, 1000);
      }
    }
  };

  return (
    <Modal
      icon={<Isign324001 variant="32x32_4"/>}
      title="Southside Bank Security System"
      closeModal={onClose}
      width="700"
      height="500"
    >
      <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'ms_sans_serif', fontSize: '14px' }}>Moves: {moves}</span>
          <Button onClick={resetGame}>Reset Game</Button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '8px', 
          flexGrow: 1 
        }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              style={{
                border: '2px outset #dfdfdf',
                backgroundColor: flipped.has(card.id) || matched.has(card.id) ? '#ffffff' : '#c3c3c3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '8px'
              }}
            >
              {flipped.has(card.id) || matched.has(card.id) ? card.icon : '?'}
            </div>
          ))}
        </div>

        {matched.size === CARD_PAIRS.length && (
          <div style={{
            marginTop: '16px',
            padding: '8px',
            backgroundColor: '#c3c3c3',
            border: '2px inset #dfdfdf',
            textAlign: 'center',
            fontFamily: 'ms_sans_serif',
            fontSize: '14px'
          }}>
            🎉 Access Granted! Completed in {moves} moves!
          </div>
        )}
      </div>
    </Modal>
  );
};

export default HackingModal;