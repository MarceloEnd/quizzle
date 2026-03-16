import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';

export const StandardHeader = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        // A very light, creamy blue-grey gradient for a premium feel
        background: 'linear-gradient(90deg, #F0F4F8 0%, #FFFFFF 100%)', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        py: 0.5
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo Section */}
          <Box
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ 
                width: 55, 
                height: 55, 
                borderRadius: '14px', 
                boxShadow: '0 8px 20px -6px rgba(0,0,0,0.15)',
                objectFit: 'cover',
                mr: 2,
                border: '2px solid #FFF'
              }}
            />
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 900,
                fontFamily: '"Outfit", sans-serif', 
                letterSpacing: '-0.5px',
                // Professional Slate Blue instead of pure black
                color: '#2D3436', 
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Quiz for Kids
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

        </Toolbar>
      </Container>
    </AppBar>
  );
};