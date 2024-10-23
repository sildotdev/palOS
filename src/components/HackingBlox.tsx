import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from '@react95/core';
import { Isign324001 } from '@react95/icons';

interface HackingBlocksModalProps {
  onClose: () => void;
}

const HackingBlocksModal: React.FC<HackingBlocksModalProps> = ({ onClose }) => {
  const TIME_LIMIT = 45;
  const GRID_SIZE = 8;
  const NUM_OPTIONS = 9;
  
  const [targetPattern, setTargetPattern] = useState<boolean[][]>([]);
  const [gridOptions, setGridOptions] = useState<Array<{id: number, pattern: boolean[][], isCorrect: boolean}>>([]);
  const [selectedGrids, setSelectedGrids] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  // Generate a random 8x8 grid pattern
  const generatePattern = () => {
    return Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => Math.random() < 0.4)
    );
  };

  // Create a variation of a pattern by making small changes
  const createPatternVariation = (originalPattern: boolean[][]) => {
    const variation = originalPattern.map(row => [...row]);
    const numChanges = Math.floor(Math.random() * 2) + 1; // 2-4 changes
    
    for (let i = 0; i < numChanges; i++) {
      // Pick a random position
      const y = Math.floor(Math.random() * GRID_SIZE);
      const x = Math.floor(Math.random() * GRID_SIZE);
      
      // Different types of variations
      const variationType = Math.random();
      
      if (variationType < 0.4) {
        // Simple flip
        variation[y][x] = !variation[y][x];
      } else if (variationType < 0.7) {
        // Shift a pixel
        const direction = Math.floor(Math.random() * 4);
        const newY = y + [-1, 0, 1, 0][direction];
        const newX = x + [0, 1, 0, -1][direction];
        
        if (newY >= 0 && newY < GRID_SIZE && newX >= 0 && newX < GRID_SIZE) {
          variation[y][x] = !variation[y][x];
          variation[newY][newX] = !variation[newY][newX];
        }
      } else {
        // Create or remove a small pattern
        const size = 2;
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny < GRID_SIZE && nx < GRID_SIZE) {
              variation[ny][nx] = Math.random() < 0.5;
            }
          }
        }
      }
    }
    return variation;
  };

  // Initialize the game
  const initializeGame = useCallback(() => {
    // Generate 3 correct patterns
    const correctPatterns = Array(3).fill(null).map(() => generatePattern());
    
    // Create the full target pattern
    const fullTarget = Array(GRID_SIZE).fill(null).map((_, y) => 
      Array(GRID_SIZE * 3).fill(null).map((_, x) => {
        const section = Math.floor(x / GRID_SIZE);
        return correctPatterns[section][y][x % GRID_SIZE];
      })
    );
    
    // Create 2 variations for each correct pattern
    const incorrectPatterns = correctPatterns.flatMap(correctPattern => [
      createPatternVariation(correctPattern),
      createPatternVariation(correctPattern)
    ]);
    
    // Combine correct patterns and their variations
    const allGrids = [
      ...correctPatterns.map((pattern, index) => ({
        id: index,
        pattern,
        isCorrect: true
      })),
      ...incorrectPatterns.map((pattern, index) => ({
        id: index + 3,
        pattern,
        isCorrect: false
      }))
    ].sort(() => Math.random() - 0.5);

    setTargetPattern(fullTarget);
    setGridOptions(allGrids);
    setSelectedGrids([]);
    setTimeLeft(TIME_LIMIT);
    setGameStatus('playing');
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    if (timeLeft <= 0) {
      setGameStatus('lost');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameStatus]);

  const handleGridSelection = (gridId: number) => {
    if (gameStatus !== 'playing') return;

    setSelectedGrids(prev => {
      const newSelected = prev.includes(gridId)
        ? prev.filter(id => id !== gridId)
        : [...prev, gridId].slice(-3);
      
      if (newSelected.length === 3) {
        const selectedGridsCorrect = newSelected
          .map(id => gridOptions.find(g => g.id === id)?.isCorrect)
          .every(isCorrect => isCorrect);
        
        if (selectedGridsCorrect) {
          setGameStatus('won');
        }
      }
      
      return newSelected;
    });
  };

  // Render a single grid cell with fixed pixel size
  const renderCell = (filled: boolean, small: boolean = false) => (
    <div style={{
      width: '12px',
      height: '12px',
      backgroundColor: filled ? '#00ff00' : '#003300',
      border: '1px solid #001100'
    }} />
  );

  return (
    <Modal
      icon={<Isign324001 variant="32x32_4"/>}
      title="Southside Bank Security System"
      closeModal={onClose}
      width="700"
      height="600"
    >
      <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontFamily: 'ms_sans_serif',
          fontSize: '14px'
        }}>
          <span>Time Remaining: {timeLeft}s</span>
          <span>Selected: {selectedGrids.length}/3</span>
        </div>

        {/* Target pattern display */}
        <div style={{
          border: '2px inset #dfdfdf',
          padding: '8px',
          backgroundColor: '#000',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE * 3}, 1fr)`,
            gap: 0,
            backgroundColor: '#001100'
          }}>
            {targetPattern.map((row, y) =>
              row.map((cell, x) => (
                <div key={`${y}-${x}`} style={{ lineHeight: 0 }}>
                  {renderCell(cell)}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Grid options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          flex: 1
        }}>
          {gridOptions.map((grid) => (
            <button
              key={grid.id}
              onClick={() => handleGridSelection(grid.id)}
              style={{
                padding: '8px',
                border: `2px ${selectedGrids.includes(grid.id) ? 'inset' : 'outset'} #dfdfdf`,
                backgroundColor: '#c3c3c3',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gap: 0,
                backgroundColor: '#000',
                padding: '2px'
              }}>
                {grid.pattern.map((row, y) =>
                  row.map((cell, x) => (
                    <div key={`${y}-${x}`} style={{ lineHeight: 0 }}>
                      {renderCell(cell, true)}
                    </div>
                  ))
                )}
              </div>
            </button>
          ))}
        </div>

        {gameStatus !== 'playing' && (
          <div style={{
            padding: '8px',
            backgroundColor: gameStatus === 'won' ? '#c3ffc3' : '#ffc3c3',
            border: '2px inset #dfdfdf',
            textAlign: 'center',
            fontFamily: 'ms_sans_serif',
            fontSize: '14px'
          }}>
            {gameStatus === 'won' ? 'Access Granted!' : 'Access Denied - Time Expired'}
            <button
              onClick={initializeGame}
              style={{
                marginLeft: '16px',
                padding: '4px 8px',
                border: '2px outset #dfdfdf',
                backgroundColor: '#c3c3c3',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default HackingBlocksModal;