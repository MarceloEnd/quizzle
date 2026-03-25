import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Paper, Typography, Container, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';
import StarIcon from '@mui/icons-material/Star';
import { StandardHeader } from '../../components/StandardHeader';

const generateSingleQuestion = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 * num2;
  
  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    const offset = Math.floor(Math.random() * 10) + 1;
    const fake = Math.random() > 0.5 ? correctAnswer + offset : Math.max(1, correctAnswer - offset);
    options.add(fake);
  }
  
  return {
    num1, num2, 
    answer: correctAnswer,
    options: Array.from(options).sort(() => Math.random() - 0.5)
  };
};

export const EinmalEinsTimeAttackSite = () => {
  const INITIAL_TIME = 60;
  const [currentQuestion, setCurrentQuestion] = useState(() => generateSingleQuestion());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isActive, setIsActive] = useState(false); // Startet pausiert für den "Go"-Klick
  const [isLocking, setIsLocking] = useState(false);
  const timerRef = useRef(null);

  // Countdown Logic
  useEffect(() => {
    if (isActive && timeLeft > 0 && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsGameOver(true);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, isGameOver]);

  const handleAnswer = (val) => {
    if (!isActive || isLocking || isGameOver) return;
    
    setSelectedAnswer(val);
    setIsLocking(true);

    const isCorrect = val === currentQuestion.answer;
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(prev => prev + 1);
      } else {
        // Zeitstrafe bei falscher Antwort im Time-Attack Modus besonders fies!
        setTimeLeft(prev => Math.max(0, prev - 3));
      }
      
      setCurrentQuestion(generateSingleQuestion());
      setSelectedAnswer(null);
      setIsLocking(false);
    }, 400); // Schnellerer Übergang für Action-Feeling
  };

  const startNewGame = () => {
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setCurrentQuestion(generateSingleQuestion());
    setIsGameOver(false);
    setIsActive(true);
    setSelectedAnswer(null);
  };

  return (
    <>
      <StandardHeader previousPath="/spiele" />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
        <Typography variant="h4" fontWeight="900" gutterBottom>1x1 Time Attack</Typography>

        <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          {/* Timer mit Farbumschlag bei wenig Zeit */}
          <Paper elevation={4} sx={{ 
            px: 3, py: 1, display: 'flex', alignItems: 'center', 
            bgcolor: timeLeft <= 10 ? '#ffebee' : '#f8f9fa',
            transition: 'background-color 0.3s'
          }}>
            <TimerIcon sx={{ fontSize: 24, mr: 1, color: timeLeft <= 10 ? '#d32f2f' : '#666' }} />
            <Typography variant="h4" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: timeLeft <= 10 ? '#d32f2f' : 'inherit' }}>
              {timeLeft}s
            </Typography>
          </Paper>

          {/* Score Anzeige */}
          <Paper elevation={4} sx={{ px: 3, py: 1, display: 'flex', alignItems: 'center', bgcolor: '#e3f2fd' }}>
            <StarIcon sx={{ fontSize: 24, mr: 1, color: '#1976d2' }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              {score}
            </Typography>
          </Paper>
        </Stack>

        <Paper elevation={12} sx={{ p: 6, mb: 4, bgcolor: '#000', color: 'white', position: 'relative', borderRadius: 4, minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {(!isActive && !isGameOver) && (
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>Bereit für 60 Sekunden?</Typography>
              <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>Spiel Starten</Button>
            </Box>
          )}
          
          {isActive && (
             <Typography variant="h1" sx={{ fontWeight: 900, letterSpacing: -2 }}>
                {currentQuestion.num1} × {currentQuestion.num2}
             </Typography>
          )}

          {(isActive === false && timeLeft < INITIAL_TIME && !isGameOver) && (
             <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>Weiter</Button>
             </Box>
          )}
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.answer;

            return (
              <Button
                key={option}
                variant="contained"
                disabled={!isActive || isLocking}
                onClick={() => handleAnswer(option)}
                sx={{ 
                  py: 3, fontSize: '2.2rem', fontWeight: 900, borderRadius: 3,
                  bgcolor: isSelected ? (isCorrect ? '#2e7d32' : '#d32f2f') : '#1976d2',
                  '&.Mui-disabled': isSelected ? {
                    bgcolor: isCorrect ? '#2e7d32' : '#d32f2f',
                    color: 'white', opacity: 1
                  } : {},
                  '&:hover': { bgcolor: '#1565c0' }
                }}
              >
                {option}
              </Button>
            );
          })}
        </Box>

        {/* Game Over Dialog */}
        <Dialog open={isGameOver} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 5, textAlign: 'center' } }}>
          <DialogTitle sx={{ pt: 4 }}>
            <EmojiEventsIcon sx={{ fontSize: 100, color: '#ffc107' }} />
            <Typography variant="h3" fontWeight="900">ZEIT UM!</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ my: 2, p: 3, bgcolor: '#f0f7ff', borderRadius: 3 }}>
              <Typography variant="h6">Du hast geschafft:</Typography>
              <Typography variant="h2" fontWeight="900" color="primary">{score}</Typography>
              <Typography variant="subtitle1">Aufgaben korrekt gelöst</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
            <Button variant="contained" size="large" onClick={startNewGame} sx={{ px: 6, py: 2, borderRadius: 3, fontWeight: 'bold' }}>
              Neuer Versuch
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};