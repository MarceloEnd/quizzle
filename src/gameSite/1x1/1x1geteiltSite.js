import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Paper, Typography, Container, Button, Stack, LinearProgress 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import { StandardHeader } from '../../components/StandardHeader';
import { EndMenuNewGame } from '../../components/EndMenuNewGame';

/**
 * Logic for Unique Division Questions:
 * Generates all 100 possible divisions (Result / Divisor = Quotient),
 * shuffles them, and returns the requested amount.
 */
const generateQuestions = (amount = 10) => {
  const pool = [];
  
  // 1. Create all 100 possible division tasks based on 1x1 to 10x10
  for (let a1 = 1; a1 <= 10; a1++) {
    for (let a2 = 1; a2 <= 10; a2++) {
      const ergebnis = a1 * a2; 
      const divisor = a1;
      const quotient = a2; // The correct answer
      
      pool.push({ num1: ergebnis, num2: divisor, answer: quotient });
    }
  }

  // 2. Shuffle the deck
  const shuffledPool = pool.sort(() => Math.random() - 0.5);

  // 3. Process the slice and create multiple choice options
  return shuffledPool.slice(0, amount).map((task) => {
    const { num1, num2, answer } = task;
    
    const options = new Set([answer]);
    while (options.size < 4) {
      // Offset of 1-5 for tighter, more challenging options
      const offset = Math.floor(Math.random() * 5) + 1;
      const fake = Math.random() > 0.5 ? answer + offset : Math.max(1, answer - offset);
      options.add(fake);
    }
    
    return {
      num1, 
      num2, 
      answer,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    };
  });
};

export const GeteiltSite = () => {
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
        // Penalty for mistakes
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
        <Typography variant="h4" fontWeight="900" gutterBottom>1x1 Geteilt</Typography>

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
            {currentQuestion.num1} ÷ {currentQuestion.num2}
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
                    py: 3, fontSize: '2.2rem', fontWeight: 900, borderRadius: 3,
                    transition: 'all 0.15s ease-in-out',
                    transform: isSelected ? 'scale(0.95)' : 'scale(1)',
                    bgcolor: isSelected ? (isCorrect ? '#2e7d32' : '#d32f2f') : '#1976d2',
                    '&:hover': {
                      bgcolor: isSelected ? (isCorrect ? '#1b5e20' : '#c62828') : '#1565c0',
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
          winText={"GEWINNER!"}
          winAnswer={`Zeit: ${time}s`}
          restart={startNewGame}
          backLink={`/spiele`}
        />
      </Container>
    </>
  );
};