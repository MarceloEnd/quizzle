import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // Need to install @mui/icons-material
import logo from '../images/logo.jpeg';

export const StandardHeader = ({previousPath}) => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'linear-gradient(90deg, #F0F4F8 0%, #FFFFFF 100%)', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        py: 0.5
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* 1. Left Section: Backlink */}
          <Box sx={{ width: { xs: 40, sm: 100 }, display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton 
              component={Link} 
              to={previousPath}
              sx={{ 
                color: '#2D3436',
                transition: 'all 0.2s',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)', transform: 'translateX(-3px)' }
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* 2. Center Section: Logo and Name */}
          <Box
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              position: 'absolute', 
              left: '50%',
              transform: 'translateX(-50%)',
              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': { transform: 'translateX(-50%) scale(1.05)' } 
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ 
                width: { xs: 40, sm: 55 }, // Smaller on mobile
                height: { xs: 40, sm: 55 }, 
                borderRadius: '14px', 
                boxShadow: '0 8px 20px -6px rgba(0,0,0,0.15)',
                objectFit: 'cover',
                mr: { xs: 1, sm: 2 },
                border: '2px solid #FFF'
              }}
            />
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 900,
                fontFamily: '"Outfit", sans-serif', 
                letterSpacing: '-0.5px',
                color: '#2D3436', 
                fontSize: { xs: '1.1rem', sm: '1.5rem' } // Responsive font size
              }}
            >
              Quiz for Kids
            </Typography>
          </Box>

          {/* 3. Right Section: Empty spacer to balance the layout */}
          <Box sx={{ width: { xs: 40, sm: 100 } }} />

        </Toolbar>
      </Container>
    </AppBar>
  );
};