import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Container, Fade, IconButton} from '@mui/material';

import { 
  ArrowForwardIos as ArrowIcon,
  ArrowBackIosNew as ArrowBackIcon, // Added back arrow
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  AutoAwesome as MagicIcon,
  Lightbulb as IdeaIcon
} from '@mui/icons-material';

export const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    
      const banners = [
        {
          title: "HALLO ENTDECKER!",
          text: "Bereit für ein Abenteuer? Klick hier!",
          icon: <StarIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
          color: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          path: "/spiele"
        },
        {
          title: "QUIZ-MEISTER?",
          text: "Zeig was du kannst im neuen Quiz!",
          icon: <TrophyIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />,
          color: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
          path: "/quizliste"
        },
        {
          title: "LACHMAL WIEDER!",
          text: "Die besten Witze warten auf dich.",
          icon: <MagicIcon sx={{ fontSize: 40, color: '#E1BEE7' }} />,
          color: 'linear-gradient(45deg, #E91E63 30%, #F06292 90%)',
          path: "/witzliste"
        },
        {
          title: "WORT-PROFI?",
          text: "Knacke die Wortschlange!",
          icon: <IdeaIcon sx={{ fontSize: 40, color: '#C8E6C9' }} />,
          color: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
          path: "/spiele/wortschlangeliste"
        }
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
        <Container maxWidth="md" sx={{ mt: 3 }}>
        {/* Relative Box to hold Link and absolute Arrows */}
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          
          {/* Left Arrow */}
          <IconButton 
            onClick={prevBanner}
            sx={{ 
                position: 'absolute', left: 10, zIndex: 10, 
                color: 'white', bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Link to={activeBanner.path} style={{ textDecoration: 'none', width: '100%' }}>
            <Fade in={true} key={currentBanner} timeout={800}>
              <Box 
                sx={{ 
                  background: activeBanner.color,
                  borderRadius: '24px',
                  p: { xs: 4, md: 6 }, // Increased padding for arrows
                  color: 'white',
                  textAlign: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.01)' }
                }}
              >
                {activeBanner.icon}
                <Typography variant="h4" sx={{ fontWeight: '900', letterSpacing: 1 }}>
                  {activeBanner.title}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '1.1rem' }}>
                  {activeBanner.text}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  {banners.map((_, i) => (
                    <Box 
                      key={i}
                      sx={{ 
                        width: 8, height: 8, borderRadius: '50%', 
                        bgcolor: 'white', opacity: i === currentBanner ? 1 : 0.3 
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
                color: 'white', bgcolor: 'rgba(255,255,255,0.2)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' }
            }}
          >
            <ArrowIcon />
          </IconButton>
        </Box>
      </Container>
    );
}