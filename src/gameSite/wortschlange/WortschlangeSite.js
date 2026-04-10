import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, Button, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { StandardHeader } from '../../components/StandardHeader';
import { EndMenuNextGame } from '../../components/EndMenuNextGame';

// IMPORTANT: Import your generatePuzzle function here.
// It should return { id, kategorie, wort, grid, solutionPath }
// for the given ID, ensuring 'wort' is 9 letters.
// 'grid' must be a 3x3 array of letters.
import { getKategorieById } from './functions/functions'; 

export const WortSchlangeSite = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const puzzleId = parseInt(id);

    const [puzzleData, setPuzzleData] = useState(null);
    const [wordProgress, setWordProgress] = useState("");
    const [removedIndices, setRemovedIndices] = useState(new Set());
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    // Initialize/Reset game on ID change
    useEffect(() => {
        const data = getKategorieById(puzzleId);
        
        // Safety check if puzzle ID is valid
        if (!data || data.wort.length !== 9) {
            console.error("Invalid puzzle data provided for ID:", puzzleId);
            return;
        }

        setPuzzleData(data);
        setWordProgress("");
        setRemovedIndices(new Set());
        setIsFinished(false);
        setError(false);
    }, [puzzleId, navigate]);

    // Handle button clicks within the grid
    const handleCellClick = (letter, row, col) => {
        if (isFinished || error) return;

        const currentIndex = wordProgress.length;
        
        // Ensure the clicked letter matches the NEXT expected letter in the word
        // It converts to UPPERCASE for comparison safety.
        const expectedLetter = puzzleData.wort[currentIndex].toUpperCase();

        if (letter.toUpperCase() === expectedLetter) {
            setWordProgress(prev => prev + expectedLetter);
            setRemovedIndices(prev => new Set(prev).add(`${row}-${col}`));
            
            // Winning check
            if (currentIndex + 1 === 9) {
                setTimeout(() => setIsFinished(true), 600);
            }
        } else {
            // Flash red on error
            setError(true);
            setTimeout(() => setError(false), 400);
        }
    };

    if (!puzzleData) return <Typography>Lade Spieldaten...</Typography>;

    // Convert word target to Uppercase for display consistency
    const targetWord = puzzleData.wort.toUpperCase();
    return (
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: '100vh', pb: 10 }}>
            <StandardHeader previousPath="/spiele/wortschlangeliste" />
            
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={8} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 6, textAlign: 'center' }}>
                    
                    {/* Game Title */}
                    <Typography variant="h3" fontWeight="900" sx={{ mb: 1, color: '#1976d2', fontStyle: 'italic' }}>
                        Wortschlange
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#546e7a', mb: 5 }}>
                        Finde ein Wort aus der Kategorie: {puzzleData.kategorie.toUpperCase()}
                    </Typography>

                    {/* TARGET WORD PROGRESS DISPLAY */}
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 6 }}>
                        {targetWord.split('').map((char, index) => {
                            const isFilled = index < wordProgress.length;
                            return (
                                <Paper
                                    key={index}
                                    elevation={isFilled ? 2 : 0}
                                    sx={{
                                        width: { xs: 35, sm: 50 },
                                        height: { xs: 45, sm: 60 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: { xs: '1.5rem', sm: '2.2rem' },
                                        fontWeight: '900',
                                        bgcolor: isFilled ? '#c8e6c9' : '#fff',
                                        border: '3px solid',
                                        borderColor: error && index === wordProgress.length ? '#f44336' : (isFilled ? '#4caf50' : '#cfd8dc'),
                                        color: '#333',
                                        borderRadius: 2,
                                        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                >
                                    {isFilled ? char : ""}
                                </Paper>
                            );
                        })}
                    </Stack>

                    {/* 3x3 GAME GRID (The Snake) */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper
                            elevation={1}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: { xs: 1, sm: 2 },
                                width: { xs: '280px', sm: '380px' },
                                p: { xs: 1.5, sm: 2 },
                                bgcolor: '#f1f8e9',
                                borderRadius: 4,
                                border: '2px solid #a5d6a7'
                            }}
                        >
                            {puzzleData.grid.map((row, rowIndex) => (
                                row.map((cellLetter, colIndex) => {
                                    const cellId = `${rowIndex}-${colIndex}`;
                                    const isRemoved = removedIndices.has(cellId);

                                    return (
                                        <Box key={cellId} sx={{ width: '100%', height: { xs: 80, sm: 110 }, position: 'relative' }}>
                                            {!isRemoved && (
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => handleCellClick(cellLetter, rowIndex, colIndex)}
                                                    sx={{
                                                        height: '100%',
                                                        fontSize: { xs: '2rem', sm: '3rem' },
                                                        borderRadius: '16px',
                                                        bgcolor: '#fff',
                                                        color: '#1976d2',
                                                        fontWeight: '900',
                                                        boxShadow: '0px 7px 0px #1565c0', // Depth effect
                                                        border: '1px solid #1976d2',
                                                        transition: 'transform 0.1s, box-shadow 0.1s',
                                                        '&:hover': { bgcolor: '#f5faff' },
                                                        '&:active': { transform: 'translateY(4px)', boxShadow: '0px 3px 0px #1565c0' }, // "Pressed" effect
                                                    }}
                                                >
                                                    {cellLetter.toUpperCase()}
                                                </Button>
                                            )}
                                            {/* Green Checkmark appears when cell is removed */}
                                            {isRemoved && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4caf50' }}>
                                                    <CheckCircleOutlineIcon sx={{ fontSize: '3rem' }} />
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })
                            ))}
                        </Paper>
                    </Box>

                </Paper>
            </Container>

            {/* Winning Menu Dialog */}
            <EndMenuNextGame 
                gameWon={isFinished} 
                winText={`Super gemacht!`}
                winAnswer={`${puzzleData.wort.toUpperCase()}`} // Show the full solved word
                nextGameLink={`/spiele/wortschlange/${puzzleId + 1}`}
                backLink={`/spiele/wortschlangeliste`}
            />
        </Box>
    );
};