import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, Paper, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { generatePuzzle } from './functions/functions';
import { useSearchParams } from 'react-router-dom';
import { StandardHeader } from '../../components/StandardHeader';
import { EndMenuNewGame } from '../../components/EndMenuNewGame';

export const MathSquareSite = () => {
    const [searchParams] = useSearchParams();
    const isHard = searchParams.has('schwer');
    const isEasy = searchParams.has('leicht');
    const [gameData, setGameData] = useState(null);
    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    // Responsive sizing logic
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const cellSize = isMobile ? 42 : 60; // Shrink cells for mobile

    const startNewGame = useCallback(() => {
        const data = generatePuzzle(isEasy, isHard);
        setGameData(data);
        const initialInputs = {};
        data.inputCoords.forEach(coord => initialInputs[coord] = '');
        setInputs(initialInputs);
        setStatus({});
        setShowSuccess(false);
    }, [isEasy, isHard]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    // --- AUTOMATIC CHECK LOGIC ---
    useEffect(() => {
        if (!gameData || Object.keys(inputs).length === 0) return;

        const { inputCoords, fullValues } = gameData;
        const newStatus = {};
        let allCorrect = true;
        let allFilled = true;

        inputCoords.forEach((pos) => {
            const val = inputs[pos];
            
            // Track if any field is empty
            if (val === '') {
                allFilled = false;
                allCorrect = false;
                return;
            }

            // Check correctness
            if (Number(val) !== fullValues[pos]) {
                newStatus[pos] = 'error';
                allCorrect = false;
            }
        });

        setStatus(newStatus);

        // Only show success if every field is filled AND correct
        if (allFilled && allCorrect) {
            setShowSuccess(true);
        }
    }, [inputs, gameData]);
    
    const renderCell = (val, type, pos) => {
        const commonStyles = {
            width: cellSize, 
            height: cellSize, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px solid #000', 
            fontSize: isMobile ? '0.9rem' : '1.2rem', 
            fontWeight: 'bold', 
            boxSizing: 'border-box'
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
                        inputMode: 'numeric', // Better mobile keyboard
                        style: { textAlign: 'center', padding: 0, height: `${cellSize}px`, fontWeight: 'bold' } 
                    }}
                    sx={{ 
                        width: cellSize, height: cellSize,
                        '& .MuiOutlinedInput-root': {
                            height: '100%', borderRadius: 0,
                            '& fieldset': { border: '1px solid #000' },
                            ...(isError && {
                                '& fieldset': { border: '3px solid #d32f2f !important', margin: '2px' }
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

    if (!gameData) return null;

    return (
        <>
            <StandardHeader previousPath="/spiele"/>
            <Container disableGutters={isMobile} sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Rechne Quadrat
                </Typography>
                
                {/* overflowX: 'auto' is a safety net for very small screens */}
                <Paper elevation={4} sx={{ p: isMobile ? 1 : 2, bgcolor: '#fff', overflowX: 'auto', maxWidth: '100%' }}>
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: `repeat(7, ${cellSize}px)`, 
                        gap: 0.5,
                        width: 'fit-content'
                    }}>
                        {/* Row 1 */}
                        {renderDynamicCell('0,0')} {renderCell(gameData.ops.r1, 'op')} {renderDynamicCell('0,2')} 
                        {renderCell(gameData.ops.r2, 'op')} {renderDynamicCell('0,4')} {renderCell('=', 'op')} {renderCell(gameData.r[0], 'result')}

                        {/* Row 2 */}
                        {renderCell(gameData.ops.c1, 'op')} {renderCell('', 'block')} {renderCell(gameData.ops.c3, 'op')} 
                        {renderCell('', 'block')} {renderCell(gameData.ops.c5, 'op')} {renderCell('', 'block')} {renderCell('', 'block')}

                        {/* Row 3 */}
                        {renderDynamicCell('2,0')} {renderCell(gameData.ops.r3, 'op')} {renderDynamicCell('2,2')} 
                        {renderCell(gameData.ops.r4, 'op')} {renderDynamicCell('2,4')} {renderCell('=', 'op')} {renderCell(gameData.r[1], 'result')}

                        {/* Row 4 */}
                        {renderCell(gameData.ops.c2, 'op')} {renderCell('', 'block')} {renderCell(gameData.ops.c4, 'op')} 
                        {renderCell('', 'block')} {renderCell(gameData.ops.c6, 'op')} {renderCell('', 'block')} {renderCell('', 'block')}

                        {/* Row 5 */}
                        {renderDynamicCell('4,0')} {renderCell(gameData.ops.r5, 'op')} {renderDynamicCell('4,2')} 
                        {renderCell(gameData.ops.r6, 'op')} {renderDynamicCell('4,4')} {renderCell('=', 'op')} {renderCell(gameData.r[2], 'result')}

                        {/* Row 6 */}
                        {renderCell('=', 'op')} {renderCell('', 'block')} {renderCell('=', 'op')} 
                        {renderCell('', 'block')} {renderCell('=', 'op')} {renderCell('', 'block')} {renderCell('', 'block')}

                        {/* Row 7 */}
                        {renderCell(gameData.c[0], 'result')} {renderCell('', 'block')} {renderCell(gameData.c[1], 'result')} 
                        {renderCell('', 'block')} {renderCell(gameData.c[2], 'result')} {renderCell('', 'block')} {renderCell('', 'block')}
                    </Box>
                </Paper>
                
                <EndMenuNewGame 
                    gameWon={showSuccess} 
                    winText={""}
                    winAnswer={`GEWINNER`}
                    restart={startNewGame}
                    backLink={`/spiele`}
                />
            </Container>
        </>
    );
};