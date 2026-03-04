import React from 'react';
import { Box, Typography, Button, Paper, Divider, Stack } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import ReplayIcon from '@mui/icons-material/Replay';

export const QuizResult = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  
  // Custom feedback based on performance
  const getFeedback = () => {
    if (percentage === 100) return { label: "MILLIONÄR!", color: "#ffd700", msg: "Perfekt! Du bist ein Einhorn-Experte!" };
    if (percentage >= 70) return { label: "PROFI-REITER", color: "#c0c0c0", msg: "Super gemacht! Fast fehlerfrei." };
    if (percentage >= 50) return { label: "STALL-MEISTER", color: "#cd7f32", msg: "Gut gemacht! Übung macht den Meister." };
    return { label: "ANFÄNGER", color: "#3b82f6", msg: "Schau dir die Serie nochmal an und versuch es erneut!" };
  };

  const status = getFeedback();

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh' 
    }}>
      <Paper elevation={24} sx={{
        p: 6,
        maxWidth: 500,
        width: '100%',
        textAlign: 'center',
        bgcolor: '#000814',
        border: `4px solid ${status.color}`,
        borderRadius: 10,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glowing Background Effect */}
        <Box sx={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, ${status.color}22 0%, transparent 70%)`,
          zIndex: 0
        }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <TrophyIcon sx={{ fontSize: 100, color: status.color, mb: 2 }} />
          
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: 2 }}>
            {status.label}
          </Typography>
          
          <Typography variant="h5" sx={{ color: '#ffd700', mb: 4 }}>
             Gesamt: {score} von {total} Punkten
          </Typography>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />

          <Typography variant="body1" sx={{ mb: 4, fontStyle: 'italic', opacity: 0.9 }}>
            "{status.msg}"
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large"
              startIcon={<ReplayIcon />}
              onClick={onRestart}
              sx={{ 
                bgcolor: status.color, 
                color: '#000',
                fontWeight: 'bold',
                px: 4,
                borderRadius: '50px',
                '&:hover': { bgcolor: '#fff' }
              }}
            >
              Nochmal spielen
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
