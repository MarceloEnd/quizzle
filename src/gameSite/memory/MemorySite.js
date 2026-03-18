import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Typography, Button, 
  Card, CardActionArea, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { StandardHeader } from '../../components/StandardHeader';
import { useSearchParams } from 'react-router-dom';

const SYMBOLS = [
  '🍎', '🍌', '🍇', '🍒', '🍓', ' kiwi', '🍍', '🥥', 
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
    <>
      <StandardHeader previousPath="/spiele"/>
      {/* Changed maxWidth to md to allow 6 cards to breathe on desktop */}
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
        <Typography variant="h3" fontWeight="900" gutterBottom color="primary" sx={{ letterSpacing: -1, fontSize: { xs: '2.5rem', sm: '3.5rem' } }}>
            MEMORY
        </Typography>

        <Box sx={{ 
            display: 'grid', 
            // The logic: 4 columns mobile, 6 columns desktop
            gridTemplateColumns: { 
                xs: 'repeat(4, 1fr)', 
                sm: 'repeat(6, 1fr)' 
            }, 
            gap: { xs: 1, sm: 2 }, 
            maxWidth: { xs: 400, sm: 800 }, 
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
                      aspectRatio: '1/1',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                      bgcolor: isMatched ? '#c8e6c9' : (isFlipped ? 'white' : '#1976d2'),
                      boxShadow: isFlipped ? 4 : 2,
                      borderRadius: { xs: 1, sm: 2 }, // Smaller radius on small screens
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%' }}>
                    <Typography 
                      // Shrink emoji size on mobile so it doesn't overflow
                      sx={{ 
                        fontSize: { xs: '1.5rem', sm: '2.5rem' },
                        visibility: isFlipped ? 'visible' : 'hidden',
                        transform: isFlipped ? 'none' : 'rotateY(180deg)'
                      }}
                    >
                      {card.symbol}
                    </Typography>
                  </CardActionArea>
                </Card>
              );
            })}
        </Box>

        <Dialog open={gameWon} PaperProps={{ sx: { borderRadius: 5, p: 3, textAlign: 'center' } }}>
            <DialogTitle>
              <EmojiEventsIcon sx={{ fontSize: 100, color: '#ffc107' }} />
              <Typography variant="h4" fontWeight="900">WINNER!</Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6">Finished in {moves} moves.</Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" size="large" onClick={initGame} fullWidth sx={{ py: 2, borderRadius: 3, fontWeight: 'bold' }}>
                  New Game
              </Button>
            </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};