import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Typography, 
  Card, CardActionArea,
} from '@mui/material';
import { StandardHeader } from '../../components/StandardHeader';
import { useSearchParams } from 'react-router-dom';
import { EndMenuNewGame } from '../../components/EndMenuNewGame';

const SYMBOLS = [
  '🍎', '🍌', '🍇', '🍒', '🍓', '🥝', '🍍', '🥥', 
  '🥑', '🥦', '🌽', '🥕', '🍑', '🍋', '🍉', '🍄' 
];

export const MemorySite = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const isHard = searchParams.has('schwer');
  const isEasy = searchParams.has('leicht');

  const initGame = useCallback(() => {
    let pairCount = 10;
    if(isEasy) pairCount = 8;
    else if(isHard) pairCount = 12;

    const activeSymbols = SYMBOLS.slice(0, pairCount);
    const gameSet = [...activeSymbols, ...activeSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));

    setCards(gameSet);
    setMatched([]);
    setFlipped([]);
    setMoves(0);
    setGameWon(false);
    setDisabled(false);
  }, [isHard, isEasy]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (index) => {
    if (disabled || matched.includes(index) || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setDisabled(true);
      checkMatch(newFlipped);
    }
  };

  const checkMatch = (currentFlipped) => {
    const [first, second] = currentFlipped;
    if (cards[first].symbol === cards[second].symbol) {
      setMatched(prev => {
        const nextMatched = [...prev, first, second];
        if (nextMatched.length === cards.length) setGameWon(true);
        return nextMatched;
      });
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 800);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StandardHeader previousPath="/spiele"/>
      
      <Container 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', // Vertical centering
          alignItems: 'center',     // Horizontal centering
          py: 4 
        }}
      >
        <Typography 
          variant="h3" 
          fontWeight="900" 
          gutterBottom 
          color="primary" 
          sx={{ mb: 4, letterSpacing: -1, fontSize: { xs: '2.5rem', sm: '3.5rem' } }}
        >
            MEMORY
        </Typography>

        <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', // Centers the cards in the last row
            gap: { xs: 1, sm: 2 }, 
            maxWidth: { xs: 400, sm: 850 }, 
            margin: '0 auto',
            px: { xs: 2, sm: 0 }
        }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              const isMatched = matched.includes(index);

              return (
                <Card 
                  key={index}
                  sx={{ 
                      // Calculate width to mimic a grid: 4 per row mobile, 6 per row desktop
                      width: { 
                        xs: 'calc(25% - 8px)', 
                        sm: 'calc(16.66% - 16px)' 
                      },
                      aspectRatio: '1/1',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                      bgcolor: isMatched ? '#c8e6c9' : (isFlipped ? 'white' : '#1976d2'),
                      boxShadow: isFlipped ? 4 : 2,
                      borderRadius: { xs: 1, sm: 2 },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%' }}>
                    <Typography 
                      sx={{ 
                        fontSize: { xs: '1.5rem', sm: '2.5rem' },
                        visibility: isFlipped ? 'visible' : 'hidden',
                        transform: isFlipped ? 'none' : 'rotateY(180deg)',
                        textAlign: 'center'
                      }}
                    >
                      {card.symbol}
                    </Typography>
                  </CardActionArea>
                </Card>
              );
            })}
        </Box>
        <EndMenuNewGame 
          gameWon={gameWon} 
          winText={"GEWINNER!"}
          winAnswer={`In ${moves} Zügen gelöst`}
          restart={initGame}
          backLink={`/spiele`}
        />
      </Container>
    </Box>
  );
};