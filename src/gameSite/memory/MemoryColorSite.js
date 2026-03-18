import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Container, Typography, Button, 
  Card, CardActionArea, Dialog 
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { StandardHeader } from '../../components/StandardHeader';
import { useSearchParams } from 'react-router-dom';

// Vibrant, kid-friendly color palette
const COLORS = [
  '#FF5252', '#448AFF', '#4CAF50', '#FFEB3B', 
  '#E040FB', '#FF9800', '#00BCD4', '#795548',
  '#9E9E9E', '#607D8B', '#FF4081', '#7C4DFF',
  '#18FFFF', '#8BC34A', '#F44336', '#3F51B5'
];

export const MemoryColorSite = () => {
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
    // Determine how many pairs to use based on URL params
    let pairCount = 10;
    if (isEasy) pairCount = 8;
    else if (isHard) pairCount = 12;

    // Slice the colors and create pairs
    const activeColors = COLORS.slice(0, pairCount);
    const gameSet = [...activeColors, ...activeColors]
      .sort(() => Math.random() - 0.5)
      .map((color, index) => ({ id: index, color }));

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
    // Prevent clicking if board is locked or card is already revealed
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
    
    if (cards[first].color === cards[second].color) {
      // It's a match!
      setMatched(prev => {
        const nextMatched = [...prev, first, second];
        if (nextMatched.length === cards.length) setGameWon(true);
        return nextMatched;
      });
      setFlipped([]);
      setDisabled(false);
    } else {
      // Not a match - flip back after a short delay
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 800);
    }
  };

  return (
    <Box sx={{ bgcolor: '#F5F7FA', minHeight: '100vh', pb: 10 }}>
      <StandardHeader previousPath="/spiele"/>
      
      <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 4 }, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          fontWeight="900" 
          color="primary" 
          sx={{ 
            mb: 1, 
            letterSpacing: -1, 
            fontSize: { xs: '2.2rem', sm: '3.5rem' } 
          }}
        >
            FARBEN MEMORY
        </Typography>
      

        {/* Responsive Grid System */}
        <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
                xs: 'repeat(4, 1fr)', // 4 per row on mobile
                sm: 'repeat(6, 1fr)'  // 6 per row on desktop
            }, 
            gap: { xs: 1, sm: 2 }, 
            maxWidth: { xs: '100%', sm: 800 }, 
            margin: '0 auto',
            px: { xs: 2, sm: 0 }
        }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              const isMatched = matched.includes(index);

              return (
                <Card 
                  key={index}
                  elevation={isFlipped ? 4 : 2}
                  sx={{ 
                    aspectRatio: '1/1',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    // Blue back, white front (acting as a border for the color)
                    bgcolor: isFlipped ? 'white' : '#1976d2',
                    borderRadius: { xs: 1.5, sm: 2 },
                    overflow: 'hidden',
                    // Slight padding when flipped to show a white border around the color
                    p: isFlipped ? 0.8 : 0,
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleCardClick(index)} 
                    sx={{ height: '100%', borderRadius: 'inherit' }}
                  >
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: 'inherit',
                        bgcolor: card.color, // The actual game color
                        visibility: isFlipped ? 'visible' : 'hidden',
                        // Prevents the color from appearing mirrored
                        transform: isFlipped ? 'none' : 'rotateY(180deg)',
                        transition: 'opacity 0.3s',
                        opacity: isMatched ? 0.6 : 1, // Dim matched pairs slightly
                      }} 
                    />
                  </CardActionArea>
                </Card>
              );
            })}
        </Box>

        {/* Win Dialog */}
        <Dialog 
          open={gameWon} 
          PaperProps={{ sx: { borderRadius: 5, p: 3, textAlign: 'center', maxWidth: '350px' } }}
        >
            <Box sx={{ py: 2 }}>
              <EmojiEventsIcon sx={{ fontSize: 100, color: '#ffc107', mb: 1 }} />
              <Typography variant="h4" fontWeight="900" gutterBottom>SUPER!</Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Du hast es in {moves} Zügen geschafft.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={initGame} 
                fullWidth 
                sx={{ 
                  py: 1.5, 
                  borderRadius: 3, 
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45a049' }
                }}
              >
                Nochmal spielen
              </Button>
            </Box>
        </Dialog>

      </Container>
    </Box>
  );
};