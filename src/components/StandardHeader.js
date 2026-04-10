import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Box, Container, IconButton, 
  Button, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo.jpeg';

export const StandardHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinks = [
    { title: 'Quiz', path: '/quizliste' },
    { title: 'Witze', path: '/witzliste' },
    { title: 'Spiele', path: '/spiele' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => location.pathname === path;

  const getLinkStyle = (path) => ({
    fontWeight: 700,
    textDecoration: 'none',
    mx: 2,
    color: '#FFFFFF',
    borderRadius: '50px',
    backgroundColor: isActive(path) ? '#FF9800' : 'transparent',
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': { 
      backgroundColor: isActive(path) ? '#E68A00' : 'rgba(255, 255, 255, 0.1)',
    }
  });

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          background: '#3798ddff', 
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          py: 0.5
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* 1. LEFT SECTION (Mobile: Burger + "Menu" | Desktop: Logo + Title) */}
            <Box sx={{ display: 'flex', alignItems: 'center', flex: isMobile ? 1 : '0 1 auto' }}>
              {isMobile ? (
                <Box onClick={handleDrawerToggle} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <IconButton sx={{ color: 'white', p: 0 }}>
                    <MenuIcon />
                  </IconButton>
                  <Typography sx={{ color: 'white', fontWeight: 700, ml: 0.5, fontSize: '0.9rem' }}>
                    Menu
                  </Typography>
                </Box>
              ) : (
                <Box
                  component={Link}
                  to="/"
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{ width: 50, height: 50, borderRadius: '12px', mr: 1.5, border: '2px solid #FFF' }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#ffffffff' }}>
                    Quiz for Kids
                  </Typography>
                </Box>
              )}
            </Box>

            {/* 2. CENTER SECTION (Mobile: Centered Logo | Desktop: Centered Links) */}
            <Box 
              sx={{ 
                position: 'absolute', 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {isMobile ? (
                <Box
                  component={Link}
                  to="/"
                  sx={{ display: 'flex' }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{ width: 45, height: 45, borderRadius: '10px', border: '2px solid #FFF' }}
                  />
                </Box>
              ) : (
                navLinks.map((link) => (
                  <Button 
                    key={link.title} 
                    component={Link} 
                    to={link.path} 
                    sx={getLinkStyle(link.path)}
                  >
                    {link.title}
                  </Button>
                ))
              )}
            </Box>

            {/* 3. RIGHT SECTION (Spacer for layout balance) */}
            <Box sx={{ flex: isMobile ? 1 : '0 1 auto', display: 'flex', justifyContent: 'flex-end', minWidth: isMobile ? 0 : 50 }}>
               {/* This keeps the center absolute position truly in the center of the screen */}
               {!isMobile && <Box sx={{ width: 50 }} />}
               {isMobile && <Box sx={{ width: 60 }} />} {/* Matches approximate width of "Menu" icon+text on left */}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left" // Changed to left to match the burger position
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 240 } }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>Quiz for Kids</Typography>
          <List>
            {navLinks.map((item) => (
              <ListItem key={item.title} component={Link} to={item.path} sx={{ textDecoration: 'none' }}>
                <ListItemText 
                  primary={item.title} 
                  slotProps={{ 
                    primary: { 
                      sx: { 
                        textAlign: 'center',
                        color: location.pathname === item.path ? '#FF9800' : '#2D3436',
                        fontWeight: 700 
                      } 
                    } 
                  }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};