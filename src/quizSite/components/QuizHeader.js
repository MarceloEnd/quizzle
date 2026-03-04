import React from 'react';
import { AppBar, Toolbar, Typography, Box, LinearProgress, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.jpeg'

export const QuizHeader = ({ currentQuestion, totalQuestions }) => {
  // Calculate progress percentage
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{backgroundColor:"lightblue"}}>
          {/* Logo or App Name */}
          <IconButton
            component={Link}
            to="/"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2, color: '#FF6B6B' }} // Made it a bright color to match the theme
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ 
                width: 100, 
                height: 100, 
                borderRadius: '20px', // Bonus: rounded corners for kids!
                objectFit: 'contain' 
              }}
            />
          </IconButton>
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
