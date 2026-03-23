import { useParams, useNavigate } from 'react-router-dom';
import { getKategorieById } from './functions.js/functions';
import { StandardHeader } from '../../components/StandardHeader';
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, Grid, Container, Zoom, Fade, Divider } from '@mui/material';

export const WordSearchSite = () => {
    const { id } = useParams();
    const wordId = parseInt(id);
    const nextId = parseInt(id)+1;
    const navigate = useNavigate();
    
    const categoryData = getKategorieById(wordId);

    const [allShuffledLetters, setAllShuffledLetters] = useState([]);
    const [wordProgress, setWordProgress] = useState({ 1: "", 2: "", 3: "" });
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        if (categoryData) {
            // Wir wandeln alle Wörter in GROSSBUCHSTABEN um
            const w1 = categoryData.wort1.toUpperCase();
            const w2 = categoryData.wort2.toUpperCase();
            const w3 = categoryData.wort3.toUpperCase();

            const combinedChars = [
                ...w1.split(''),
                ...w2.split(''),
                ...w3.split('')
            ];
            
            const letterObjects = combinedChars.map(char => ({
                char: char,
                id: Math.random()
            }));

            setAllShuffledLetters(shuffleArray(letterObjects));
            setWordProgress({ 1: "", 2: "", 3: "" });
            setIsFinished(false);
        }
    }, [wordId, categoryData]);

    const handleLetterClick = (letterObj, index) => {
        let foundMatch = false;

        for (let i = 1; i <= 3; i++) {
            // Auch hier: Vergleich mit Großbuchstaben
            const targetWord = categoryData[`wort${i}`].toUpperCase();
            const currentProgress = wordProgress[i];

            if (
                currentProgress.length < targetWord.length &&
                targetWord[currentProgress.length] === letterObj.char
            ) {
                setWordProgress(prev => ({
                    ...prev,
                    [i]: prev[i] + letterObj.char
                }));

                const newShuffled = [...allShuffledLetters];
                newShuffled.splice(index, 1);
                setAllShuffledLetters(newShuffled);
                
                foundMatch = true;
                break; 
            }
        }

        if (!foundMatch) {
            setError(true);
            setTimeout(() => setError(false), 400);
        }
    };

    useEffect(() => {
        if (categoryData) {
            const allDone = 
                wordProgress[1] === categoryData.wort1.toUpperCase() &&
                wordProgress[2] === categoryData.wort2.toUpperCase() &&
                wordProgress[3] === categoryData.wort3.toUpperCase();
            
            if (allDone && categoryData.wort1 !== "") {
                setTimeout(() => setIsFinished(true), 800);
            }
        }
    }, [wordProgress, categoryData]);

    if (!categoryData) return <Typography>Lade Daten...</Typography>;

    return (
        <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', pb: 8 }}>
            <StandardHeader previousPath="/spiele/wortsucheliste" />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 8, border: '1px solid #e0e0e0' }}>
                    
                    <Typography variant="h5" sx={{ textAlign: 'center', mb: 4, color: '#455a64', fontWeight: 'bold' }}>
                        KATEGORIE: {categoryData.kategorie.toUpperCase()}
                    </Typography>

                    {!isFinished ? (
                        <Box>
                            <Box sx={{ mb: 6 }}>
                                {[1, 2, 3].map((num) => (
                                    <Box key={num} sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {categoryData[`wort${num}`].split('').map((_, i) => {
                                                const isFilled = i < wordProgress[num].length;
                                                const letter = wordProgress[num][i];
                                                const isWordComplete = wordProgress[num] === categoryData[`wort${num}`].toUpperCase();

                                                return (
                                                    <Paper
                                                        key={i}
                                                        elevation={isFilled ? 2 : 0}
                                                        sx={{
                                                            width: { xs: 32, sm: 45 },
                                                            height: { xs: 42, sm: 55 },
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '1.8rem',
                                                            fontWeight: '900',
                                                            bgcolor: isWordComplete ? '#c8e6c9' : (isFilled ? '#e3f2fd' : '#fff'),
                                                            border: '2px solid',
                                                            borderColor: isWordComplete ? '#4caf50' : (isFilled ? '#1976d2' : (error ? '#f44336' : '#cfd8dc')),
                                                            color: '#333',
                                                            borderRadius: 2,
                                                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                        }}
                                                    >
                                                        {isFilled ? letter : ""}
                                                    </Paper>
                                                );
                                            })}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            <Typography variant="overline" sx={{ display: 'block', textAlign: 'center', mb: 2, color: '#78909c' }}>
                                <Divider/>
                            </Typography>

                            <Grid container spacing={2} justifyContent="center">
                                {allShuffledLetters.map((letter, index) => (
                                    <Grid item key={letter.id}>
                                        <Zoom in={true}>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleLetterClick(letter, index)}
                                                sx={{
                                                    fontSize: '1.8rem',
                                                    minWidth: '65px',
                                                    height: '65px',
                                                    borderRadius: '16px',
                                                    bgcolor: '#fff',
                                                    color: '#1976d2',
                                                    fontWeight: '900',
                                                    boxShadow: '0px 5px 0px #1565c0',
                                                    border: '1px solid #1976d2',
                                                    '&:hover': { bgcolor: '#f5faff', transform: 'translateY(-2px)' },
                                                    '&:active': { transform: 'translateY(4px)', boxShadow: 'none' }
                                                }}
                                            >
                                                {letter.char}
                                            </Button>
                                        </Zoom>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ) : (
                        <Fade in={true}>
                            <Box sx={{ textAlign: 'center', py: 5 }}>
                                <Typography variant="h1" sx={{ mb: 2 }}>🌟</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>EXZELLENT!</Typography>
                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    onClick={() => navigate('/spiele/wortsuche/'+nextId)}
                                    sx={{ borderRadius: 10, px: 6, py: 2, fontSize: '1.2rem', fontWeight: 'bold' }}
                                >
                                    NÄCHSTE RUNDE
                                </Button>
                            </Box>
                        </Fade>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};