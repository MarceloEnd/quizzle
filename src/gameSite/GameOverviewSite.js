import React from 'react';
import { StandardHeader } from "../components/StandardHeader";
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

// Grouped Game Data
const GAMES = [
  { 
    title: "Fehlersuche", 
    basePath: "/spiele/fehler",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }]
  },
  { 
    title: "Memory (Symbole)", 
    basePath: "/spiele/memory",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ]
  },
  { 
    title: "Memory (Farben)", 
    basePath: "/spiele/memorycolor",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ]
  },
  { 
    title: "Memory (Versus)", 
    basePath: "/spiele/memoryversus",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ]
  },
  { 
    title: "Sudoku 4x4", 
    basePath: "/spiele/sudoku4x4",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }]
  },
  { 
    title: "Sudoku 6x6", 
    basePath: "/spiele/sudoku6x6",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ]
  },
  { 
    title: "Rechne Quadrat", 
    basePath: "/spiele/rechnequadrat",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ]
  },
  { 
    title: "Wort Suche", 
    basePath: "/spiele/wortsucheliste",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }]
  },
  { 
    title: "Das kleine 1x1", 
    basePath: "/spiele/1x1",
    difficulties: [
      { label: "Mal", query: "", color: "#4caf50" },
      { label: "Mal Zeit", query: "zeit", color: "#2196f3" },
      { label: "Geteilt", query: "geteilt", color: "#f44336" }
    ]
  },
];

export const GameOverviewSite = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#F0F4F8', minHeight: '100vh' }}>
      <StandardHeader previousPath="/"/>
      
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 } }}>
        <Paper 
          elevation={isMobile ? 0 : 4} 
          sx={{ 
            p: { xs: 1, sm: 4 }, 
            textAlign: 'center', 
            bgcolor: isMobile ? 'transparent' : 'white',
            borderRadius: '24px' 
          }}
        >
          <Typography 
            variant={isMobile ? "h4" : "h2"} 
            color="primary" 
            gutterBottom 
            sx={{ fontWeight: 800, mb: 4 }}
          >
            Spiele
          </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 0 }}>
            {GAMES.map((game, index) => (
              <Paper 
                key={index} 
                elevation={2} 
                sx={{ 
                  borderRadius: '20px', 
                  backgroundColor: "#e3fae8ff",
                  overflow: 'hidden'
                }}
              >
                <ListItem 
                  sx={{ 
                    p: { xs: 2, sm: 3 },
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: isMobile ? 0 : 56, mb: isMobile ? 1 : 0 }}>
                    <VideogameAssetIcon sx={{ fontSize: isMobile ? 32 : 40, color: '#219538ff' }} />
                  </ListItemIcon>
                  
                  <ListItemText 
                    primary={
                      <Typography 
                        variant={isMobile ? "h6" : "h5"} 
                        sx={{ fontWeight: 'bold', mb: isMobile ? 2 : 0 }}
                      >
                        {game.title}
                      </Typography>
                    }
                  />

                  {/* Difficulty Selection Section */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    flexWrap: 'wrap', 
                    justifyContent: 'center',
                    width: isMobile ? '100%' : 'auto'
                  }}>
                    {game.difficulties.map((diff) => (
                      <Button 
                        key={diff.label}
                        variant="contained" 
                        component={Link} 
                        to={`${game.basePath}${diff.query}`}
                        size={isMobile ? "medium" : "large"}
                        sx={{ 
                          borderRadius: '10px', 
                          backgroundColor: diff.color,
                          fontWeight: 'bold',
                          flexGrow: isMobile ? 1 : 0,
                          fontSize: isMobile ? '0.75rem' : '0.875rem',
                          '&:hover': { backgroundColor: diff.color, filter: 'brightness(0.9)' },
                        }}
                      >
                        {diff.label}
                      </Button>
                    ))}
                  </Box>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};