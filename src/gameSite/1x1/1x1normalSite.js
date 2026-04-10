import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Paper, Typography, Container, Button, Stack,  LinearProgress 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import { StandardHeader } from '../../components/StandardHeader';
import { EndMenuNewGame } from '../../components/EndMenuNewGame';

/**
 * Generates a set of unique multiplication questions.
 * It creates a pool of all possible 1-10 combinations, 
 * shuffles them, and picks the requested amount.
 */
const generateQuestions = (amount = 10) => {
  const allPossiblePairs = [];
  
  // 1. Create a pool of all 100 unique pairs (1x1 to 10x10)
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      allPossiblePairs.push({ num1: i, num2: j });
    }
  }

  // 2. Shuffle the pool (Fisher-Yates style approach or simple sort)
  const shuffledPairs = allPossiblePairs.sort(() => Math.random() - 0.5);

  // 3. Map the first 'amount' of pairs into question objects
  return shuffledPairs.slice(0, amount).map((pair) => {
    const { num1, num2 } = pair;
    const correctAnswer = num1 * num2;
    
    // Create unique options for the multiple choice
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) + 1;
      const fake = Math.random() > 0.5 ? correctAnswer + offset : Math.max(1, correctAnswer - offset);
      options.add(fake);
    }
    
    return {
      num1, 
      num2, 
      answer: correctAnswer,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    };
  });
};

export const EinmalEinsSite = () => {
  const [questions, setQuestions] = useState(() => generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isLocking, setIsLocking] = useState(false);
  const timerRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  useEffect(() => {
    if (isActive && !gameWon) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, gameWon]);

  const handleAnswer = (val) => {
    if (!isActive || isLocking) return;
    
    setSelectedAnswer(val);
    setIsLocking(true);

    const isCorrect = val === currentQuestion.answer;
    
    setTimeout(() => {
      if (isCorrect) {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setGameWon(true);
        }
      } else {
        // Penalty: Add 5 seconds for a wrong answer
        setTime(prev => prev + 5);
      }
      setSelectedAnswer(null);
      setIsLocking(false);
    }, 600); 
  };

  const startNewGame = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setTime(0);
    setIsActive(true);
    setGameWon(false);
    setSelectedAnswer(null);
  };

  return (
    <>
      <StandardHeader previousPath="/spiele" />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
        <Typography variant="h4" fontWeight="900" gutterBottom>1x1 Mal</Typography>

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
          <Paper elevation={2} sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa' }}>
            <TimerIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </Typography>
          </Paper>
          <Button onClick={() => setIsActive(!isActive)} variant="outlined">
            {isActive ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        </Stack>

        <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 12, borderRadius: 6, bgcolor: '#eee' }} />
            <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 'bold' }}>
                Aufgabe {currentIndex + 1} von {questions.length}
            </Typography>
        </Box>

        <Paper elevation={12} sx={{ p: 6, mb: 4, bgcolor: '#000', color: 'white', position: 'relative', borderRadius: 4 }}>
          {!isActive && (
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', borderRadius: 4 }}>
              <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>Weiter</Button>
            </Box>
          )}
          <Typography variant="h1" sx={{ fontWeight: 900, letterSpacing: -2 }}>
            {currentQuestion.num1} × {currentQuestion.num2}
          </Typography>
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
                    py: 3, 
                    fontSize: '2.2rem', 
                    fontWeight: 900, 
                    borderRadius: 3,
                    transition: 'all 0.15s ease-in-out',
                    transform: isSelected ? 'scale(0.95)' : 'scale(1)',
                    bgcolor: isSelected 
                      ? (isCorrect ? '#2e7d32' : '#d32f2f') 
                      : '#1976d2',
                    '&:hover': {
                      bgcolor: isSelected 
                        ? (isCorrect ? '#1b5e20' : '#c62828') 
                        : '#1565c0',
                    },
                    '&.Mui-disabled': isSelected ? {
                      bgcolor: isCorrect ? '#2e7d32' : '#d32f2f',
                      color: 'white',
                      opacity: 1 
                    } : {}
                }}
              >
                {option}
              </Button>
            );
          })}
        </Box>
        
        <EndMenuNewGame 
          gameWon={gameWon} 
          winText={"FERTIG!"}
          winAnswer={`Zeit: ${time}s`}
          restart={startNewGame}
          backLink={`/spiele`}
        />
      </Container>
    </>
  );
};