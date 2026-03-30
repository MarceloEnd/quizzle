import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container
} from '@mui/material';
import { 
  ArrowForwardIos as ArrowIcon,
  Search as SearchIcon // Better fit for Wimmelbilder
} from '@mui/icons-material';
import { StandardHeader } from '../../components/StandardHeader';
import data from './pictures.json';

// 1. JSON Data with IDs 1-5
const themes = data;

export const WimmelbilderOverviewSite = () => {
  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <StandardHeader previousPath="/spiele"/>
      
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, sm: 6 }, 
            textAlign: 'center', 
            bgcolor: 'transparent' 
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 900, 
              color: '#219538', 
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3.75rem' },
              fontFamily: '"Outfit", sans-serif'
            }} 
            gutterBottom
          >
            Wimmelbilder
          </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {themes.map((item) => (
              <Paper 
                key={item.id} 
                elevation={3} 
                sx={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden',
                  backgroundColor: '#e3fae8',
                  border: '2px solid #fff',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(33, 149, 56, 0.15)'
                  }
                }}
              >
                <ListItem 
                  sx={{ 
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <SearchIcon sx={{ fontSize: 45, color: '#219538' }} />
                  </ListItemIcon>
                  
                  <ListItemText 
                    primary={
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 800, 
                          color: '#2D3436',
                          fontFamily: '"Outfit", sans-serif',
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        {item.kategorie}
                      </Typography>
                    }
                  />
                  
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to={`/spiele/wimmelbild/${item.id}`} // Updated route path
                    sx={{ 
                      borderRadius: '16px', 
                      backgroundColor: '#219538',
                      px: 4,
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': { backgroundColor: '#1a7a2e' }
                    }}
                    endIcon={<ArrowIcon />}
                  >
                    Suchen!
                  </Button>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};