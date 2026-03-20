import React, { useState, useRef } from 'react';
import { 
  Box, Container, Typography, Button, Paper, 
  Dialog, DialogTitle, DialogContent, DialogActions, Grid 
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Deine Bild-Importe
import OhneFehler1 from '../../images/1OhneFehler.png'; 
import MitFehler1 from '../../images/1MitFehler.png';   

const DIFFERENCES = [
  { id: 1, x: 34.4, y: 70.0, r: 4, name: "Ei-Symbol" },
  { id: 2, x: 55.5, y: 14.4, r: 5, name: "Schmetterling" },
  { id: 3, x: 43.3, y: 29.3, r: 3, name: "Herz-Wange" },
  { id: 4, x: 8.7, y: 77.8, r: 5, name: "Blume links" },
  { id: 5, x: 73.8, y: 47.5, r: 4, name: "Blume rechts" },
  { id: 6, x: 89.2, y: 25.9, r: 4, name: "Gänseblümchen" }
];

export const SpotTheDifferenceCursorSite = () => {
  const [foundIds, setFoundIds] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const clickableImageRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = clickableImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: x.toFixed(1), y: y.toFixed(1) });
  };

  const handleImageClick = (e) => {
    const rect = clickableImageRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Log für dich zum einfachen Erstellen neuer Punkte
    console.log(`Klick auf: x: ${clickX.toFixed(1)}, y: ${clickY.toFixed(1)}`);

    const clickedDiff = DIFFERENCES.find(diff => {
      const distance = Math.sqrt(Math.pow(clickX - diff.x, 2) + Math.pow(clickY - diff.y, 2));
      return distance < diff.r && !foundIds.includes(diff.id);
    });

    if (clickedDiff) {
      const newFoundIds = [...foundIds, clickedDiff.id];
      setFoundIds(newFoundIds);
      if (newFoundIds.length === DIFFERENCES.length) setGameWon(true);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h3" fontWeight="900" gutterBottom color="primary">
        OSTERN: FINDE DIE FEHLER
      </Typography>
      
      <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
        Gefunden: {foundIds.length} von {DIFFERENCES.length}
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Linkes Bild */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', lineHeight: 0 }}>
            <img src={OhneFehler1} alt="Original" style={{ width: '100%', height: 'auto' }} />
          </Paper>
        </Grid>

        {/* Rechtes Bild (Klickbar & mit Koordinaten-Anzeige) */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={6}
            ref={clickableImageRef}
            onMouseMove={handleMouseMove}
            onClick={handleImageClick}
            sx={{ 
              position: 'relative', 
              borderRadius: 2, 
              overflow: 'hidden', 
              cursor: 'none', // Wir verstecken den echten Cursor
              lineHeight: 0 
            }}
          >
            <img src={MitFehler1} alt="Fehler suchen" style={{ width: '100%', height: 'auto' }} />

            {/* Die gefundenen Kreise */}
            {foundIds.map(id => {
              const diff = DIFFERENCES.find(d => d.id === id);
              return (
                <Box key={id} sx={{
                  position: 'absolute', left: `${diff.x}%`, top: `${diff.y}%`,
                  width: `${diff.r * 2}%`, height: `${diff.r * 2}%`,
                  border: '3px solid #4CAF50', borderRadius: '50%',
                  transform: 'translate(-50%, -50%)', pointerEvents: 'none'
                }} />
              );
            })}

            {/* Custom Cursor mit Prozentanzeige */}
            <Box sx={{
              position: 'absolute',
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              width: 20,
              height: 20,
              border: '2px solid white',
              borderRadius: '50%',
              backgroundColor: 'rgba(25, 118, 210, 0.5)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Typography sx={{ 
                position: 'absolute', top: 25, 
                backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', 
                padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem',
                whiteSpace: 'nowrap'
              }}>
                x: {mousePos.x}% | y: {mousePos.y}%
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={gameWon} PaperProps={{ sx: { borderRadius: 5, textAlign: 'center', p: 2 } }}>
        <DialogTitle>
          <EmojiEventsIcon sx={{ fontSize: 60, color: '#ffc107' }} /> <br /> SUPER!
        </DialogTitle>
        <DialogContent>Alle Unterschiede gefunden!</DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => { setFoundIds([]); setGameWon(false); }}>Nochmal</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};