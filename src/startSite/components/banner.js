import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Fade, IconButton } from '@mui/material';

import { 
  ArrowForwardIos as ArrowIcon,
  ArrowBackIosNew as ArrowBackIcon, // Added back arrow
} from '@mui/icons-material';

import crossword from '../../images/banners/Crossword.png';
import wizard from '../../images/banners/Wizards.png';

export const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    
      const banners = [
        {
          path: "/spiele",
          image: wizard // Full-sized background wizard
        },
        {
          path: "/quizliste",
          image: crossword // Full-sized background crossword
        },
      ];
    
      // Manual change functions
      const nextBanner = (e) => {
        e.preventDefault(); // Prevents the Link from triggering when clicking the arrow
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      };
    
      const prevBanner = (e) => {
        e.preventDefault();
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
      };
    
      useEffect(() => {
        const timer = setInterval(() => {
          setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 10000);
        return () => clearInterval(timer);
      }, [banners.length]);
    
    const activeBanner = banners[currentBanner];
    
    return(
        <Container maxWidth="md" sx={{ mt: 3, px: { xs: 1, md: 3 } }}>
        {/* Relative Box to hold Link and absolute Arrows */}
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          
          {/* Left Arrow */}
          <IconButton 
            onClick={prevBanner}
            sx={{ 
                position: 'absolute', left: 10, zIndex: 10, 
                color: 'white', 
                bgcolor: 'rgba(0,0,0,0.3)', // Darkened for visibility on any image
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Link to={activeBanner.path} style={{ textDecoration: 'none', width: '100%' }}>
            <Fade in={true} key={currentBanner} timeout={800}>
              <Box 
                sx={{ 
                  borderRadius: '24px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  cursor: 'pointer',
                  overflow: 'hidden', // Required for rounded corners on background images
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.01)' },

                  // --- FULL-SIZED IMAGE BACKGROUND ---
                  backgroundImage: `url(${activeBanner.image})`,
                  backgroundSize: 'cover', // Fills the area completely
                  backgroundPosition: 'center', // Centers the relevant part of the image
                  backgroundRepeat: 'no-repeat',
                  
                  // This Box now purely defines the height of the banner
                  height: { xs: '180px', sm: '220px', md: '260px' }, 
                  
                  // Maintain internal layout for pagination dots
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end', // Puts dots at the bottom
                  alignItems: 'center',
                  p: 2, 
                  position: 'relative',
                  
                  // Optional: adds a subtle gradient at the very bottom to make dots visible
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0, left: 0, width: '100%', height: '40px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                    zIndex: 1
                  }
                }}
              >
                {/* Pagination Dots */}
                <Box sx={{ display: 'flex', gap: 1, zIndex: 2 }}>
                  {banners.map((_, i) => (
                    <Box 
                      key={i}
                      sx={{ 
                        width: 9, height: 9, borderRadius: '50%', 
                        bgcolor: 'white', 
                        // Increased opacity for visibility on images
                        opacity: i === currentBanner ? 1 : 0.45,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                      }} 
                    />
                  ))}
                </Box>
              </Box>
            </Fade>
          </Link>

          {/* Right Arrow */}
          <IconButton 
            onClick={nextBanner}
            sx={{ 
                position: 'absolute', right: 10, zIndex: 10, 
                color: 'white', 
                bgcolor: 'rgba(0,0,0,0.3)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
          >
            <ArrowIcon />
          </IconButton>
        </Box>
      </Container>
    );
}