import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        background: 'linear-gradient(90deg, #4ba5f7 0%, #c5efff 100%)',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        py: 4,
        mt: 'auto', // Important for the "Sticky Footer" effect
        width: '100%',
        display: 'block'
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="space-between" 
          alignItems="center"
        >
          {/* Copyright / Brand Name */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#ffffffff', 
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 500,
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © {currentYear} Quiz for Kids. Alle Rechte vorbehalten.
          </Typography>

          {/* Legal Links */}
          <Stack 
            direction="row" 
            spacing={3} 
            divider={
              <Divider 
                orientation="vertical" 
                flexItem 
                sx={{ height: 14, my: 'auto', borderColor: 'rgba(0,0,0,0.1)' }} 
              />
            }
          >
            <MuiLink
              component={Link}
              to="/agb"
              sx={{
                color: '#2D3436',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: '"Outfit", sans-serif',
                transition: 'all 0.2s',
                '&:hover': { color: '#4ba5f7', transform: 'translateY(-1px)' }
              }}
            >
              AGB
            </MuiLink>
            
            <MuiLink
              component={Link}
              to="/impressum"
              sx={{
                color: '#2D3436',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: '"Outfit", sans-serif',
                transition: 'all 0.2s',
                '&:hover': { color: '#4ba5f7', transform: 'translateY(-1px)' }
              }}
            >
              Impressum
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};