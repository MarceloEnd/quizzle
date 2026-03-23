import React, { useState, useMemo } from 'react'; // Added useMemo
import { 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  CardContent, 
  Zoom, 
  Box, 
  LinearProgress 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Psychology as QuizIcon } from '@mui/icons-material';

export const QuizArea = ({ data, onNext, currentIndex = 0, totalQuestions = 10 }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // --- Shuffle Logic ---
  // useMemo ensures the shuffle only happens once per question
  const shuffledOptions = useMemo(() => {
    return Object.entries(data.options).sort(() => Math.random() - 0.5);
  }, [data.options]); // Reshuffles only when the question text changes

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleOptionClick = (key) => {
    if (selectedAnswer) return;

    const correct = key === data.correctAnswerKey;
    setSelectedAnswer(key);
    setIsCorrect(correct);

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      onNext(correct);
    }, 1500);
  };

  const getOptionColor = (key) => {
    if (!selectedAnswer) return 'primary';
    if (key === data.correctAnswerKey) return 'success';
    if (key === selectedAnswer && !isCorrect) return 'error';
    return 'inherit';
  };

  return (
    <Zoom in={true} key={data.question}>
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
        
        {/* --- Header Section --- */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF9800', mb: 1 }}>
            Frage {currentIndex + 1} von {totalQuestions}
          </Typography>
          
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{
              height: 12,
              borderRadius: 6,
              bgcolor: '#FFF3E0', 
              '& .MuiLinearProgress-bar': {
                bgcolor: '#FF9800',
                borderRadius: 6,
              }
            }}
          />
        </Box>

        {/* --- Main Quiz Paper --- */}
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 2, sm: 4 }, 
            borderRadius: '24px', 
            bgcolor: 'white',
            position: 'relative'
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, gap: 1 }}>
                <QuizIcon sx={{ color: '#FF9800', fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                {data.question}
                </Typography>
            </Box>

            {/* Answers Stacked Vertically */}
            <Grid container direction="column" spacing={2}>
              {shuffledOptions.map(([key, text]) => ( // Using shuffledOptions here
                <Grid item key={key}>
                  <Paper 
                    elevation={selectedAnswer === key ? 0 : 2}
                    sx={{ 
                      borderRadius: '16px', 
                      overflow: 'hidden',
                      transition: 'all 0.2s',
                      bgcolor: selectedAnswer === key ? 'transparent' : '#FFF3E0',
                      '&:hover': { transform: selectedAnswer ? 'none' : 'scale(1.01)' }
                    }}
                  >
                    <Button
                      fullWidth
                      variant={selectedAnswer === key ? "contained" : "text"}
                      color={getOptionColor(key)}
                      onClick={() => handleOptionClick(key)}
                      disabled={selectedAnswer !== null && selectedAnswer !== key}
                      sx={{ 
                        py: 2.5, 
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        px: 3,
                        color: selectedAnswer === key ? 'white' : '#795548', 
                        '&.Mui-disabled': {
                            color: selectedAnswer === key ? 'white' : 'rgba(0,0,0,0.38)'
                        }
                      }}
                      startIcon={
                        selectedAnswer === key ? (
                          isCorrect ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />
                        ) : (
                          <Box sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: '#FF9800', 
                            mr: 1 
                          }} />
                        )
                      }
                    >
                      {text}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Paper>
      </Box>
    </Zoom>
  );
};