import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Box, 
  Grid, 
  Container, 
  CardActionArea,
  Card,        // Swapped Paper for Card
  CardContent  // Added CardContent for proper spacing
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ExtensionIcon from '@mui/icons-material/Extension';
import CalculateIcon from '@mui/icons-material/Calculate';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

export const FeaturedGames = () => {
  const featured = [
    {
      title: "Wortschlange",
      desc: "Folge der Spur!",
      icon: <ExtensionIcon sx={{ fontSize: 50, color: '#fff' }} />,
      path: "/spiele/wortschlangeliste",
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      shadow: '0 8px 20px rgba(76, 175, 80, 0.35)'
    },
    {
      title: "Mathe-Quadrat",
      desc: "Zahlen-Rätsel",
      icon: <CalculateIcon sx={{ fontSize: 50, color: '#fff' }} />,
      path: "/spiele/rechnequadrat",
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      shadow: '0 8px 20px rgba(33, 150, 243, 0.35)'
    },
    {
      title: "Sudoku",
      desc: "Bist du schlau?",
      icon: <SportsEsportsIcon sx={{ fontSize: 50, color: '#fff' }} />,
      path: "/spiele/sudoku6x6",
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      shadow: '0 8px 20px rgba(255, 152, 0, 0.35)'
    },
    {
      title: "Wortsuche",
      desc: "Finde alle!",
      icon: <SpellcheckIcon sx={{ fontSize: 50, color: '#fff' }} />,
      path: "/spiele/wortsucheliste",
      gradient: 'linear-gradient(135deg, #E91E63 0%, #F06292 100%)',
      shadow: '0 8px 20px rgba(233, 30, 99, 0.35)'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 2 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: '900', 
          color: '#3b9ecdff', 
          mb: 3, 
          textAlign: { xs: 'center', md: 'left' },
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
        Featured Games
      </Typography>

      <Grid container spacing={3} alignItems="stretch">
        {featured.map((game, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={index} 
            sx={{ display: 'flex' }}
          >
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: '24px', 
                background: game.gradient,
                boxShadow: game.shadow,
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                
                // FORCE EQUAL WIDTH & HEIGHT
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column',

                '&:hover': { 
                  transform: 'scale(1.05) translateY(-5px)',
                  boxShadow: '0 12px 25px rgba(0,0,0,0.2)'
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%', left: '-50%',
                    width: '200%', height: '200%',
                    background: 'linear-gradient(to bottom right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)',
                    transform: 'rotate(30deg)',
                    pointerEvents: 'none'
                }
              }}
            >
              <CardActionArea 
                component={Link} 
                to={game.path} 
                sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'stretch' // Ensures inner content fills width
                }}
              >
                <CardContent sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1.5,
                    minHeight: '150px',
                    minWidth: '140px',
                    justifyContent: 'center'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
                  }}>
                    {game.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                          fontWeight: '900', 
                          color: '#fff', 
                          lineHeight: 1.1, 
                          textShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      {game.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', mt: 0.5 }}>
                      {game.desc}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};