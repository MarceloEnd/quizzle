import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Paper, Typography, Button, Container, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { generatePuzzle } from './functions/functions';
import { useSearchParams } from 'react-router-dom';
import { StandardHeader } from '../../components/StandardHeader';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const MathSquareSite = () => {
    const [searchParams] = useSearchParams();
    const isHard = searchParams.has('schwer');
    const isEasy = searchParams.has('leicht');
    const [gameData, setGameData] = useState(null);
    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const startNewGame = useCallback(() => {
        const data = generatePuzzle(isEasy,isHard); 
        setGameData(data);
        
        const initialInputs = {};
        data.inputCoords.forEach(coord => initialInputs[coord] = '');
        
        setInputs(initialInputs);
        setStatus({});
        setShowSuccess(false);
    }, [isEasy,isHard]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const checkSolution = () => {
        if (!gameData) return;
        const { inputCoords, fullValues } = gameData;
        const newStatus = {};
        let allCorrect = true;

        inputCoords.forEach((pos) => {
            const userVal = Number(inputs[pos]);
            const correctVal = fullValues[pos];

            if (userVal !== correctVal) {
                newStatus[pos] = 'error';
                allCorrect = false;
            }
        });

        if (allCorrect) {
            setShowSuccess(true);
        } else {
            setStatus(newStatus);
        }
    };

    const renderCell = (val, type, pos) => {
        const commonStyles = {
            width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #000', fontSize: '1.2rem', fontWeight: 'bold', boxSizing: 'border-box'
        };

        if (type === 'empty') {
            const isError = status[pos] === 'error';
            return (
                <TextField
                    value={inputs[pos] || ''}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setInputs({ ...inputs, [pos]: val });
                        setStatus({ ...status, [pos]: null });
                    }}
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{ 
                        style: { 
                            textAlign: 'center', padding: 0, height: '60px', 
                            fontWeight: 'bold', zIndex: 2 
                        } 
                    }}
                    sx={{ 
                        width: 60, height: 60,
                        '& .MuiOutlinedInput-root': {
                            height: '100%',
                            borderRadius: 0,
                            '& fieldset': { 
                                border: '1px solid #000', 
                                transition: 'border 0.2s ease-in-out'
                            },
                            '&.Mui-focused fieldset': { 
                                border: '3px solid #1976d2' 
                            },
                            // RED SQUARE HIGHLIGHT
                            ...(isError && {
                                '& fieldset': {
                                    border: '4px solid #d32f2f !important', // Thick red square
                                    margin: '2px', // Slight inset to look distinct
                                }
                            })
                        }
                    }}
                />
            );
        }

        const bg = type === 'block' ? '#5dc5d5ff' : 'transparent';
        const border = type === 'block' ? 'none' : '1px solid #000';
        return <Box sx={{ ...commonStyles, bgcolor: bg, border: border }}>{val}</Box>;
    };

    const renderDynamicCell = (pos) => {
        if (!gameData) return null;
        return gameData.inputCoords.includes(pos) 
            ? renderCell('', 'empty', pos) 
            : renderCell(gameData.fullValues[pos], 'static');
    };

    if (!gameData) return (
        <Container sx={{ mt: 10, textAlign: 'center' }}>
            <Typography>Generating random puzzle...</Typography>
        </Container>
    );

    return (
        <>
            <StandardHeader />
            <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', letterSpacing: 1 }}>
                    Rechne Quadrat
                </Typography>
                
                <Paper elevation={4} sx={{ p: 2, bgcolor: '#fff' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 60px)', gap: 0.5 }}>
                        {/* Row 1 */}
                        {renderDynamicCell('0,0')} {renderCell(gameData.ops.r1, 'op')} {renderDynamicCell('0,2')} 
                        {renderCell(gameData.ops.r2, 'op')} {renderDynamicCell('0,4')} {renderCell('=', 'op')} {renderCell(gameData.r[0], 'result')}

                        {/* Row 2 (Vertical Operators) */}
                        {renderCell(gameData.ops.c1, 'op')} {renderCell('', 'block')} {renderCell(gameData.ops.c3, 'op')} 
                        {renderCell('', 'block')} {renderCell(gameData.ops.c5, 'op')} {renderCell('', 'block')} {renderCell('', 'block')}

                        {/* Row 3 */}
                        {renderDynamicCell('2,0')} {renderCell(gameData.ops.r3, 'op')} {renderDynamicCell('2,2')} 
                        {renderCell(gameData.ops.r4, 'op')} {renderDynamicCell('2,4')} {renderCell('=', 'op')} {renderCell(gameData.r[1], 'result')}

                        {/* Row 4 (Vertical Operators) */}
                        {renderCell(gameData.ops.c2, 'op')} {renderCell('', 'block')} {renderCell(gameData.ops.c4, 'op')} 
                        {renderCell('', 'block')} {renderCell(gameData.ops.c6, 'op')} {renderCell('', 'block')} {renderCell('', 'block')}

                        {/* Row 5 */}
                        {renderDynamicCell('4,0')} {renderCell(gameData.ops.r5, 'op')} {renderDynamicCell('4,2')} 
                        {renderCell(gameData.ops.r6, 'op')} {renderDynamicCell('4,4')} {renderCell('=', 'op')} {renderCell(gameData.r[2], 'result')}

                        {/* Row 6 (Bottom Equals) */}
                        {renderCell('=', 'op')} {renderCell('', 'block')} {renderCell('=', 'op')} 
                        {renderCell('', 'block')} {renderCell('=', 'op')} {renderCell('', 'block')} {renderCell('', 'block')}

                        {/* Row 7 (Final Results) */}
                        {renderCell(gameData.c[0], 'result')} {renderCell('', 'block')} {renderCell(gameData.c[1], 'result')} 
                        {renderCell('', 'block')} {renderCell(gameData.c[2], 'result')} {renderCell('', 'block')} {renderCell('', 'block')}
                    </Box>
                </Paper>

                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                    <Button variant="contained" size="large" onClick={checkSolution} sx={{ minWidth: 160 }}>
                        Check Answers
                    </Button>
                    <Button variant="outlined" size="large" onClick={startNewGame}>
                        New Game
                    </Button>
                </Box>

                <Dialog open={showSuccess} onClose={() => setShowSuccess(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, textAlign: 'center' } }}>
                    <DialogTitle sx={{ pt: 4 }}>
                        <EmojiEventsIcon sx={{ fontSize: 80, color: '#ffc107', mb: 1 }} />
                        <Typography variant="h4" fontWeight="900">GEWINNER!</Typography>
                    </DialogTitle>
                    <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                        <Button onClick={startNewGame} variant="contained" color="success">
                            Nächstes Level
                        </Button>
                    </DialogActions>
                </Dialog>


            </Container>
        </>
    );
};