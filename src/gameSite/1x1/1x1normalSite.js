import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Paper, Typography, Container, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';
import { StandardHeader } from '../../components/StandardHeader';

const generateQuestions = (amount = 10) => {
  const questions = [];
  for (let i = 0; i < amount; i++) {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 * num2;
    
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) + 1;
      const fake = Math.random() > 0.5 ? correctAnswer + offset : Math.max(1, correctAnswer - offset);
      options.add(fake);
    }
    
    questions.push({
      num1, num2, 
      answer: correctAnswer,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    });
  }
  return questions;
};

export const EinmalEinsSite = () => {
  const [questions, setQuestions] = useState(() => generateQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Tracking für visuelles Feedback
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isLocking, setIsLocking] = useState(false); // Verhindert Mehrfachklicks während der Animation
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
    
    // Kurze Pause, damit der Nutzer die Farbe (Rot/Blau) sieht
    setTimeout(() => {
      if (isCorrect) {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setGameWon(true);
        }
      } else {
        // Zeitstrafe bei Fehler (wie beim Sudoku-Konzept)
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
        <Typography variant="h4" fontWeight="900" gutterBottom>1x1 Trainer</Typography>

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
                
                // Dynamische Hintergrundfarbe:
                // 1. Wenn ausgewählt und falsch -> Rot (#d32f2f)
                // 2. Wenn ausgewählt und richtig -> Grün (#2e7d32)
                // 3. Sonst -> Standard Blau (#1976d2)
                bgcolor: isSelected 
                ? (isCorrect ? '#2e7d32' : '#d32f2f') 
                : '#1976d2',
                
                // Hover-Effekt nur erlauben, wenn nicht gerade gelockt
                '&:hover': {
                bgcolor: isSelected 
                    ? (isCorrect ? '#1b5e20' : '#c62828') 
                    : '#1565c0',
                },
                
                // Wichtig für MUI: Damit die Farben bei 'disabled' oder 'contained' greifen
                '&.Mui-disabled': isSelected ? {
                bgcolor: isCorrect ? '#2e7d32' : '#d32f2f',
                color: 'white',
                opacity: 1 // Verhindert das Ausgrauen während der Feedback-Phase
                } : {}
            }}
            >
            {option}
            </Button>
            );
          })}
        </Box>

        <Dialog open={gameWon} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 5, textAlign: 'center' } }}>
          <DialogTitle sx={{ pt: 4 }}>
            <EmojiEventsIcon sx={{ fontSize: 100, color: '#ffc107' }} />
            <Typography variant="h3" fontWeight="900">FERTIG!</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ my: 2, p: 3, bgcolor: '#f0f7ff', borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold">Zeit: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
            <Button variant="contained" size="large" onClick={startNewGame} sx={{ px: 6, py: 2, borderRadius: 3, fontWeight: 'bold' }}>
              Nochmal spielen
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};