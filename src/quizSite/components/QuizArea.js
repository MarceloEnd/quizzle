import React, { useState } from 'react';
import {Typography, Button, Grid, Card, CardContent, Zoom } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const QuizArea = ({ data, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleOptionClick = (key) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    const correct = key === data.correctAnswerKey;
    setSelectedAnswer(key);
    setIsCorrect(correct);

    // Wait 1.5 seconds so the kid can see if they were right, then move on
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      onNext(correct);
    }, 1500);
  };

  const getOptionColor = (key) => {
    if (!selectedAnswer) return 'primary'; // Default blue
    if (key === data.correctAnswerKey) return 'success'; // Correct one turns green
    if (key === selectedAnswer && !isCorrect) return 'error'; // Wrong one turns red
    return 'inherit';
  };

  return (
    <Zoom in={true} key={data.question}>
      <Card sx={{ 
        maxWidth: 800, // Slightly tighter focus
        mx: 'auto', 
        mt: 6, 
        borderRadius: 8, // Extra rounded for safety/playfulness
        border: '6px solid #FFD93D', // Bright yellow "frame"
        boxShadow: '0 20px 0px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.1)', // Layered 3D shadow
        overflow: 'visible',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 100%)', // Subtle inner glow
        position: 'relative',
        '&::before': { // Decorative "tab" or "sticker" effect
            content: '"🌟"',
            position: 'absolute',
            top: -25,
            left: -25,
            fontSize: '2rem',
            background: '#FFF',
            borderRadius: '50%',
            padding: '10px',
            boxShadow: 3
        }
        }}>
        <CardContent sx={{ p: 4 }}>
          {/* Question Text */}
          <Typography variant="h5" textAlign="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
            {data.question}
          </Typography>

          {/* Options Grid */}
          <Grid container spacing={2}>
            {Object.entries(data.options).map(([key, text]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Button
                  fullWidth
                  variant={selectedAnswer === key ? "contained" : "outlined"}
                  color={getOptionColor(key)}
                  size="large"
                  onClick={() => handleOptionClick(key)}
                  disabled={selectedAnswer !== null && selectedAnswer !== key}
                  sx={{ 
                    py: 2, 
                    borderRadius: 3, 
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                  }}
                  startIcon={
                    selectedAnswer === key ? (
                      isCorrect ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />
                    ) : null
                  }
                >
                  {text}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Zoom>
  );
};
