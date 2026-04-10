import React, { useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography,  
  Paper, 
  Grid
} from '@mui/material';
import OhneFehler1 from '../../images/Fehlersuche/1OhneFehler.png'; 
import MitFehler1 from '../../images/Fehlersuche/1MitFehler.png';   
import { StandardHeader } from '../../components/StandardHeader';
import { EndMenuNextGame } from '../../components/EndMenuNextGame';

// Die Koordinaten in Prozent (x, y) und die Klick-Radius-Größe
const DIFFERENCES = [
  { id: 1, x: 34.4, y: 70.0, r: 4, name: "Ei-Symbol" },
  { id: 2, x: 55.5, y: 14.4, r: 5, name: "Schmetterling" },
  { id: 3, x: 43.3, y: 29.3, r: 3, name: "Herz-Wange" },
  { id: 4, x: 8.7, y: 77.8, r: 5, name: "Blume links" },
  { id: 5, x: 73.8, y: 47.5, r: 4, name: "Blume rechts" },
  { id: 6, x: 89.2, y: 25.9, r: 4, name: "Gänseblümchen" }
];

export const SpotTheDifferenceSite = () => {
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
            OSTERN: FINDE DIE FEHLER
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Gefunden: {foundIds.length} von {DIFFERENCES.length}
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
            
            {/* Linkes Bild: Original */}
            <Grid item xs={12} md={6}>
                <Paper elevation={5} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Box
                    component="img"
                    src={OhneFehler1}
                    alt="Originalbild"
                    sx={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block'
                    }}
                    />
                </Paper>
            </Grid>

            {/* Rechtes Bild: Fehlerbild (Klickbar + Kreise) */}
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

        {/* Gewonnen-Dialog */}
        <EndMenuNextGame 
          gameWon={gameWon} 
          winText={"SUPER GEMACHT!"}
          winAnswer={`Du hast alle ${DIFFERENCES.length} Unterschiede gefunden!`}
          nextGameLink={`/spiele/fehler/`}
          backLink={`/spiele/fehlersucheliste`}
        />
      </Container>
    </>
  );
};