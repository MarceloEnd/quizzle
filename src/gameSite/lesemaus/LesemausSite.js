import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Grid, Divider, Container, 
  Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReplayIcon from '@mui/icons-material/Replay';
import { StandardHeader } from '../../components/StandardHeader';
import { getKategorieById } from './functions/functions';

export const LesemausSite = () => {
  const { id } = useParams();
  const wordId = parseInt(id);
  const categoryData = getKategorieById(wordId);

  // 1. Daten vorbereiten
  const originalWort = categoryData ? categoryData.wort.toUpperCase() : "";
  const woerterArray = originalWort.split(" "); 
  const wortOhneLeerzeichen = originalWort.replace(/\s+/g, '');
  const validLetters = [...new Set(wortOhneLeerzeichen.split(""))].sort();

  // 2. State
  const [eingabe, setEingabe] = useState(Array(wortOhneLeerzeichen.length).fill(""));
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Reset wenn sich die ID ändert (Nächstes Rätsel)
  useEffect(() => {
    setEingabe(Array(wortOhneLeerzeichen.length).fill(""));
    setSelectedIdx(0);
  }, [id, wortOhneLeerzeichen]);

  const istRichtig = eingabe.join("") === wortOhneLeerzeichen && wortOhneLeerzeichen !== "";

  const handleAlphabetClick = (buchstabe) => {
    if (selectedIdx >= wortOhneLeerzeichen.length || istRichtig) return;

    // Strict Check: Nur der korrekte Buchstabe wird akzeptiert
    if (buchstabe !== wortOhneLeerzeichen[selectedIdx]) return;

    const neueEingabe = [...eingabe];
    neueEingabe[selectedIdx] = buchstabe;
    setEingabe(neueEingabe);
    
    if (selectedIdx < wortOhneLeerzeichen.length - 1) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  const startNewGame = () => {
    setEingabe(Array(wortOhneLeerzeichen.length).fill(""));
    setSelectedIdx(0);
  };

  if (!categoryData) return <Typography sx={{ p: 4, textAlign: 'center' }}>Rätsel wird geladen oder nicht gefunden...</Typography>;

  let charCounter = 0;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8F9FA' }}>
      <StandardHeader previousPath="/spiele/lesemausliste" />
      
      <Container maxWidth="md" sx={{ py: 6, flexGrow: 1 }}>
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', bgcolor: 'transparent' }}>
          
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#2D3436', mb: 1, fontFamily: '"Outfit", sans-serif' }}>
            Code-Knacker 🔍
          </Typography>
          
          <Typography variant="h6" sx={{ color: '#219538', fontWeight: 700, mb: 4 }}>
            Kategorie: {categoryData.kategorie}
          </Typography>

          {/* Wort-Zeilen */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mb: 6 }}>
            {woerterArray.map((einzelWort, wortIndex) => (
              <Box key={wortIndex} sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, sm: 1.5 }, flexWrap: 'wrap' }}>
                {einzelWort.split("").map((char) => {
                  const currentGlobalIndex = charCounter++; 
                  return (
                    <Box key={currentGlobalIndex} onClick={() => setSelectedIdx(currentGlobalIndex)} sx={{ cursor: 'pointer' }}>
                      <Paper
                        elevation={selectedIdx === currentGlobalIndex ? 10 : 2}
                        sx={{
                          width: { xs: 42, sm: 55 },
                          height: { xs: 65, sm: 80 },
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '14px',
                          border: selectedIdx === currentGlobalIndex ? '3px solid #219538' : '2px solid transparent',
                          bgcolor: istRichtig ? '#e3fae8' : 'white',
                          transition: 'all 0.2s',
                          transform: selectedIdx === currentGlobalIndex ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 800 }}>{eingabe[currentGlobalIndex]}</Typography>
                        <Divider sx={{ width: '70%', my: 0.5 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#636E72' }}>
                           {char.charCodeAt(0) - 64}
                        </Typography>
                      </Paper>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>

          {/* Tastatur */}
          <Box sx={{ bgcolor: 'white', p: 3, borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Grid container spacing={1.5} justifyContent="center">
              {validLetters.map((b) => (
                <Grid item key={b}>
                  <Button
                    variant="contained"
                    disabled={istRichtig}
                    onClick={() => handleAlphabetClick(b)}
                    sx={{ 
                      minWidth: { xs: 50, sm: 65 }, height: { xs: 50, sm: 65 },
                      fontSize: '1.4rem', fontWeight: 900, borderRadius: '16px',
                      backgroundColor: '#219538', boxShadow: '0 5px 0 #1a7a2e',
                      '&:active': { transform: 'translateY(4px)', boxShadow: 'none' },
                      '&:hover': { backgroundColor: '#1a7a2e' }
                    }}
                  >
                    {b}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>

      {/* Gewinner Dialog */}
      <Dialog 
        open={istRichtig} 
        maxWidth="xs" 
        fullWidth 
        PaperProps={{ sx: { borderRadius: 4, textAlign: 'center', p: 2 } }}
      >
        <DialogTitle>
          <EmojiEventsIcon sx={{ fontSize: 80, color: '#ffc107', mb: 1 }} />
          <Typography variant="h4" fontWeight="900">GEWONNER!</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#636E72', mb: 1 }}>
            Du hast das Rätsel gelöst:
          </Typography>
          <Box sx={{ p: 2, bgcolor: '#f0f7ff', borderRadius: 2, border: '2px dashed #219538' }}>
            <Typography variant="h5" fontWeight="900" color="primary">
              {originalWort}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', gap: 2, px: 3, pb: 4 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link}
            to={`/spiele/lesemaus/${wordId + 1}`}
            fullWidth 
            color="success"
            sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold', fontSize: '1.1rem' }}
            endIcon={<ArrowForwardIcon />}
          >
            Nächstes Rätsel
          </Button>
          <Button 
            variant="outlined" 
            size="medium" 
            onClick={startNewGame} 
            fullWidth 
            sx={{ py: 1, borderRadius: 2, fontWeight: 'bold', color: '#636E72', borderColor: '#636E72' }}
            startIcon={<ReplayIcon />}
          >
            Nochmal spielen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};