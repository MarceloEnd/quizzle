import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Typography, Button, 
  Card, CardActionArea, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Paper
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { StandardHeader } from '../../components/StandardHeader';
import { useSearchParams } from 'react-router-dom';

const SYMBOLS = [
  '🍎', '🍌', '🍇', '🍒', '🍓', '🥝', '🍍', '🥥', 
  '🥑', '🥦', '🌽', '🥕', '🍑', '🍋', '🍉', '🍄' 
];

export const MemoryVersusSite = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  
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
    setGameWon(false);
    setDisabled(false);
    setCurrentPlayer(1);
    setScores({ 1: 0, 2: 0 });
  }, [isHard, isEasy]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (index) => {
    if (disabled || matched.includes(index) || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
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
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
        setCurrentPlayer(curr => (curr === 1 ? 2 : 1));
      }, 1000);
    }
  };

  const getWinnerText = () => {
    if (scores[1] > scores[2]) return "Spieler 1 gewinnt!";
    if (scores[2] > scores[1]) return "Spieler 2 gewinnt!";
    return "Unentschieden!";
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StandardHeader previousPath="/spiele"/>
      
      {/* Centering Wrapper */}
      <Container 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1, // Takes up remaining vertical space
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', // VERTICAL CENTERING
          alignItems: 'center',     // HORIZONTAL CENTERING
          py: 4
        }}
      >
        <Typography 
          variant="h3" 
          fontWeight="900" 
          color="primary" 
          sx={{ mb: 4, letterSpacing: -1, textAlign: 'center', fontSize: { xs: '2rem', sm: '3.5rem' } }}
        >
            MEMORY VERSUS
        </Typography>

        {/* Scoreboard */}
        <Grid container spacing={2} sx={{ mb: 4, maxWidth: 600 }} justifyContent="center">
            <Grid item xs={5} sm={4}>
                <Paper elevation={currentPlayer === 1 ? 8 : 1} sx={{ 
                    p: 2, textAlign: 'center',
                    bgcolor: currentPlayer === 1 ? '#e3f2fd' : '#f5f5f5',
                    border: currentPlayer === 1 ? '3px solid #1976d2' : '3px solid transparent',
                    borderRadius: 3,
                }}>
                    <Typography variant="subtitle1" fontWeight="bold">Spieler 1</Typography>
                    <Typography variant="h4" fontWeight="900">{scores[1]}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="textSecondary" fontWeight="bold">VS</Typography>
            </Grid>
            <Grid item xs={5} sm={4}>
                <Paper elevation={currentPlayer === 2 ? 8 : 1} sx={{ 
                    p: 2, textAlign: 'center',
                    bgcolor: currentPlayer === 2 ? '#fce4ec' : '#f5f5f5',
                    border: currentPlayer === 2 ? '3px solid #d81b60' : '3px solid transparent',
                    borderRadius: 3,
                }}>
                    <Typography variant="subtitle1" fontWeight="bold">Spieler 2</Typography>
                    <Typography variant="h4" fontWeight="900">{scores[2]}</Typography>
                </Paper>
            </Grid>
        </Grid>

        {/* Grid Box */}
        {/* Centered Game Grid using Flexbox for balanced rows */}
        <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', // This centers the cards in the last row
            gap: { xs: 1, sm: 2 }, 
            width: '100%',
            maxWidth: { xs: 400, sm: 850 }, // Adjusted slightly to fit 6 cards comfortably
            margin: '0 auto',
        }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              const isMatched = matched.includes(index);

              return (
                <Card 
                  key={index}
                  sx={{ 
                      // Set a specific width/basis so they look like a grid
                      width: { 
                        xs: 'calc(25% - 8px)', // 4 columns on mobile
                        sm: 'calc(16.66% - 16px)' // 6 columns on desktop
                      },
                      aspectRatio: '1/1',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                      bgcolor: isMatched ? '#c8e6c9' : (isFlipped ? 'white' : (currentPlayer === 1 ? '#1976d2' : '#d81b60')),
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

        <Dialog open={gameWon} PaperProps={{ sx: { borderRadius: 5, p: 3, textAlign: 'center' } }}>
            <DialogTitle>
              <EmojiEventsIcon sx={{ fontSize: 100, color: '#ffc107' }} />
              <Typography variant="h4" fontWeight="900">{getWinnerText()}</Typography>
            </DialogTitle>
            <DialogContent>
              <Typography variant="h6">Endstand: {scores[1]} - {scores[2]}</Typography>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" size="large" onClick={initGame} fullWidth sx={{ py: 2, borderRadius: 3, fontWeight: 'bold' }}>
                  Nochmal spielen
              </Button>
            </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};