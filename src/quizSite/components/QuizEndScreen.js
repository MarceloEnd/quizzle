import React from 'react';
import { Box, Typography, Button, Paper, Stack, Zoom } from '@mui/material';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import ReplayIcon from '@mui/icons-material/Replay';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const QuizResult = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedback = () => {
    if (percentage === 100) return { label: "MILLIONÄR!", color: "#FF9800", msg: "Perfekt! Du bist ein absoluter Experte!" };
    if (percentage >= 70) return { label: "PROFI", color: "#FF9800", msg: "Super gemacht! Fast fehlerfrei." };
    if (percentage >= 50) return { label: "STALL-MEISTER", color: "#795548", msg: "Gut gemacht! Übung macht den Meister." };
    return { label: "ANFÄNGER", color: "#795548", msg: "Versuch es einfach nochmal, du schaffst das!" };
  };

  const status = getFeedback();

  return (
    <Zoom in={true}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '70vh',
        px: 2 
      }}>
        <Paper 
          elevation={4} 
          sx={{
            p: { xs: 4, sm: 6 },
            maxWidth: 500,
            width: '100%',
            textAlign: 'center',
            bgcolor: 'white',
            borderRadius: '24px',
            border: `6px solid ${status.color}`,
            position: 'relative'
          }}
        >
          {/* Top Decorative Icon */}
          <Box sx={{ 
            position: 'absolute', 
            top: -40, 
            left: '50%', 
            transform: 'translateX(-50%)',
            bgcolor: 'white',
            borderRadius: '50%',
            p: 1,
            border: `6px solid ${status.color}`
          }}>
            <TrophyIcon sx={{ fontSize: 60, color: status.color }} />
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: status.color }}>
              {status.label}
            </Typography>
            
            <Paper sx={{ bgcolor: '#FFF3E0', py: 1, px: 3, borderRadius: '12px', display: 'inline-block', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#795548' }}>
                    {score} von {totalQuestions} Punkten
                </Typography>
            </Paper>

            <Typography variant="body1" sx={{ mb: 5, fontSize: '1.2rem', color: '#555', fontStyle: 'italic' }}>
              "{status.msg}"
            </Typography>

            <Stack direction="column" spacing={2}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<ReplayIcon />}
                onClick={onRestart}
                sx={{ 
                  bgcolor: '#FF9800', 
                  color: 'white',
                  fontWeight: 'bold',
                  py: 2,
                  borderRadius: '16px',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#e68900' }
                }}
              >
                Nochmal spielen
              </Button>

              <Button 
                variant="outlined" 
                component={Link}
                to="/quizliste"
                size="large"
                startIcon={<ArrowBack />}
                sx={{ 
                  color: '#FF9800',
                  borderColor: '#FF9800',
                  borderWidth: 2,
                  fontWeight: 'bold',
                  py: 1.5,
                  borderRadius: '16px',
                  textTransform: 'none',
                  '&:hover': { borderWidth: 2, bgcolor: '#FFF3E0' }
                }}
              >
                Zur Übersicht
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Zoom>
  );
};