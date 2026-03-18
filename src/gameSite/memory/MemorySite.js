import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Typography, Button, Paper, 
  Card, CardActionArea, Slider, Stack, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { StandardHeader } from '../../components/StandardHeader';

// Expanded symbol list for up to 12 pairs
const SYMBOLS = ['🍎', '🍌', '🍇', '🍒', '🍓', '🥝', '🍍', '🥥', '🥑', '🥦', '🌽', '🥕'];

export const MemorySite = () => {
  // User can now set pairs from 5 to 12
  const [pairCount, setPairCount] = useState(8); 
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const initGame = useCallback(() => {
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
  }, [pairCount]);

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
        <StandardHeader />
        <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
        <Typography variant="h3" fontWeight="900" gutterBottom color="primary" sx={{ letterSpacing: -1 }}>
            MEMORY
        </Typography>

        <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 4, bgcolor: '#fdfdfd' }}>
            <Stack spacing={3} alignItems="center">
            <Box sx={{ width: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight="800">
                Pairs: {pairCount}
                </Typography>
                <Slider
                value={pairCount}
                min={5}
                max={12} // Max 12 pairs (24 cards) to fit 5x5
                step={1}
                marks
                onChange={(e, val) => setPairCount(val)}
                sx={{ height: 8 }}
                />
            </Box>
            
            <Stack direction="row" spacing={3} alignItems="center">
                <Typography variant="h5" fontWeight="bold">Moves: {moves}</Typography>
                <Button 
                startIcon={<ReplayIcon />} 
                variant="contained" 
                size="large" // Bigger button
                onClick={initGame}
                sx={{ px: 4, py: 1.5, borderRadius: 3, fontWeight: 'bold', fontSize: '1.1rem' }}
                >
                Reset
                </Button>
            </Stack>
            </Stack>
        </Paper>

        {/* 5x5 Grid Layout */}
        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: 1.5, 
            maxWidth: 500, 
            margin: '0 auto' 
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
                    borderRadius: 2,
                }}
                >
                <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%' }}>
                    <Typography 
                    variant="h4" 
                    sx={{ 
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
            <Typography variant="h3" fontWeight="900">WINNER!</Typography>
            </DialogTitle>
            <DialogContent>
            <Typography variant="h5">Finished in {moves} moves.</Typography>
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