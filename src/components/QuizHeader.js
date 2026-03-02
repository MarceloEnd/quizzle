import React from 'react';
import { AppBar, Toolbar, Typography, Box, LinearProgress } from '@mui/material';

export const QuizHeader = ({ currentQuestion, totalQuestions }) => {
  // Calculate progress percentage
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{backgroundColor:"lightblue"}}>
          {/* Logo or App Name */}
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1, 
            fontWeight: 800,
            color: '#FFD700', // Bright Golden Yellow
            fontFamily: '"Comic Sans MS", "Chalkboard SE", "cursive"', // Kid-friendly fonts
            letterSpacing: '1px',
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FFD93D 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(2px 2px 0px #FFF)',
            display: 'inline-block'
          }}>
            {"Quiz for Kids"}
          </Typography>

          {/* Question Counter */}
          <Typography variant="body2" color="text.secondary">
            Frage <b>{currentQuestion}</b> of {totalQuestions}
          </Typography>
        </Toolbar>

        {/* Progress Bar under the header */}
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 6, borderRadius: 0 }} 
        />
      </AppBar>
    </Box>
  );
};
