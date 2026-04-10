import React, { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography,  
  Paper, 
  Grid
} from '@mui/material';
import MitFehler1 from '../../images/Wimmelbilder/1.png';   
import { StandardHeader } from '../../components/StandardHeader';
import { EndMenuNextGame } from '../../components/EndMenuNextGame';

// Die Koordinaten in Prozent (x, y) und die Klick-Radius-Größe
const DIFFERENCES = [
  { id: 1, x: 11.6, y: 30.0, r: 5, name: "Einhorn" },
  { id: 2, x: 27.1, y: 27.7, r: 5, name: "Einhorn" },
  { id: 3, x: 16.1, y: 64.9, r: 5, name: "Einhorn" },
  { id: 4, x: 27.7, y: 74.8, r: 5, name: "Einhorn" },
  { id: 5, x: 72.3, y: 50.5, r: 5, name: "Einhorn" },
  { id: 6, x: 91.6, y: 75.9, r: 5, name: "Einhorn" }
];

export const WimmelbildSite = () => {
  const [foundIds, setFoundIds] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const clickableImageRef = useRef(null); // Ref für das RECHTE Bild

  const handleImageClick = (e) => {
    if (gameWon) return;

    // Berechne die Klick-Position in Prozent relativ zum rechten Bild-Container
    const rect = clickableImageRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Prüfe, ob der Klick nah genug an einem der Unterschiede liegt
    const clickedDiff = DIFFERENCES.find(diff => {
      const distance = Math.sqrt(
        Math.pow(clickX - diff.x, 2) + Math.pow(clickY - diff.y, 2)
      );
      return distance < diff.r && !foundIds.includes(diff.id);
    });

    if (clickedDiff) {
      const newFoundIds = [...foundIds, clickedDiff.id];
      setFoundIds(newFoundIds);
      
      if (newFoundIds.length === DIFFERENCES.length) {
        setGameWon(true);
      }
    }
  };

  return (
    <>
        <StandardHeader previousPath="/spiele"/>
        <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="900" gutterBottom color="primary">
            FINDE DIE FEHLER
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Gefunden: {foundIds.length} von {DIFFERENCES.length}
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <Paper 
                    elevation={10}
                    sx={{ 
                    position: 'relative', 
                    borderRadius: 4, 
                    overflow: 'hidden',
                    cursor: 'crosshair',
                    touchAction: 'none' // Verhindert Scrollen beim Tippen
                    }}
                    ref={clickableImageRef} // Ref ist hier am wichtigsten
                    onClick={handleImageClick}
                >
                    <Box
                    component="img"
                    src={MitFehler1}
                    alt="Fehlerbild - Finde die Unterschiede!"
                    sx={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block'
                    }}
                    />

                    {/* Die Kreise, die nur auf dem rechten Bild erscheinen */}
                    {foundIds.map(id => {
                    const diff = DIFFERENCES.find(d => d.id === id);
                    return (
                        <Box
                        key={id}
                        sx={{
                            position: 'absolute',
                            left: `${diff.x}%`,
                            top: `${diff.y}%`,
                            width: `${diff.r * 2}%`,
                            height: `${diff.r * 2}%`,
                            border: '4px solid #4CAF50', // Grüner Kreis
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                            pointerEvents: 'none', // Klicks gehen durch den Kreis durch
                            zIndex: 2,
                        }}
                        />
                    );
                    })}
                </Paper>
            </Grid>
        </Grid>

        {/* Gewinner Dialog */}
        <EndMenuNextGame 
          gameWon={gameWon} 
          winText={`SUPER GEMACHT!`}
          winAnswer={`Du hast alle ${DIFFERENCES.length} Unterschiede gefunden!`}
          nextGameLink={`/spiele/wimmelbild/1`}
          backLink={`/spiele/wimmelbildliste`}
        />  
      </Container>
    </>
  );
};