import React, { useState } from 'react';
import { Box, Paper, Typography, MobileStepper, Button } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export const TextCarousel = ({ messages }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = messages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  return (
    <Box sx={{ maxWidth: 600, flexGrow: 1, margin: 'auto' }}>
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200, // Minimum height to prevent "jumping"
                p: 4,           // More padding for breathing room
                borderRadius: 4,
                bgcolor: 'action.hover', // Softer background than stark white
                border: '1px solid',
                borderColor: 'divider'
            }}
            >
            <Typography 
                variant="h6" 
                component="p"
                sx={{ 
                fontWeight: 600,
                lineHeight: 1.6, // Better readability for long text
                fontStyle: 'italic',
                color: 'text.secondary'
                }}
            >
                "{messages[activeStep]}"
            </Typography>
        </Paper>
      
        <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
            justifyContent: 'center',
            bgcolor: 'transparent',
            p: 0,
            '& .MuiMobileStepper-dot': { width: 6, height: 6 }, // Smaller dots
            '& .MuiMobileStepper-dotActive': { width: 10, borderRadius: 5 } // Pill shape for active
            }}
            nextButton={
            <Button size="small" onClick={handleNext}>
                Next
                <KeyboardArrowRight />
            </Button>
            }
            backButton={
            <Button size="small" onClick={handleBack}>
                <KeyboardArrowLeft />
                Back
            </Button>
            }
        />
    </Box>
  );
};