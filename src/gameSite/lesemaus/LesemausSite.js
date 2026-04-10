import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Grid, Divider, Container, } from '@mui/material';
import { useParams} from 'react-router-dom';
import { StandardHeader } from '../../components/StandardHeader';
import { getKategorieById } from './functions/functions';
import { EndMenuNextGame } from '../../components/EndMenuNextGame';

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

  if (!categoryData) return <Typography sx={{ p: 4, textAlign: 'center' }}>Rätsel wird geladen oder nicht gefunden...</Typography>;

  let charCounter = 0;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8F9FA' }}>
      <StandardHeader />
      
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
      <EndMenuNextGame 
        gameWon={istRichtig} 
        winText={"Du hast das Rätsel gelöst:"}
        winAnswer={originalWort}
        nextGameLink={`/spiele/lesemaus/${wordId + 1}`}
        backLink={`/spiele/lesemausliste`}
      />

    </Box>
  );
};