import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Paper, Typography, Container, Button, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import { createNewGame } from './functions/functions'; // Use the 4x4 version we made
import { StandardHeader } from '../../components/StandardHeader';
import { useSearchParams } from 'react-router-dom';
import { EndMenuNewGame } from '../../components/EndMenuNewGame';

export const Sudoku4x4Site = () => {
  const [searchParams] = useSearchParams();
  const isHard = searchParams.has('schwer');
  const isEasy = searchParams.has('leicht');
  
  const [game, setGame] = useState(() => createNewGame(isEasy, isHard));
  const [userBoard, setUserBoard] = useState(game.puzzle);
  const [selected, setSelected] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Win Logic
  useEffect(() => {
    const isSolved = userBoard.every((row, r) => 
      row.every((cell, c) => cell !== 0 && cell === game.solution[r][c])
    );
    if (isSolved && !gameWon) { 
      setGameWon(true); 
      setIsActive(false); 
    }
  }, [userBoard, game.solution, gameWon]);

  // Timer Logic
  useEffect(() => {
    if (isActive) timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const updateCell = useCallback((val) => {
    if (!selected || !isActive || gameWon) return;
    const { r, c } = selected;
    if (game.puzzle[r][c] !== 0) return; 
    const next = userBoard.map((row, ri) => row.map((cell, ci) => (ri === r && ci === c ? val : cell)));
    setUserBoard(next);
  }, [selected, userBoard, game.puzzle, isActive, gameWon]);

  // Keyboard Support (1-4 only)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive || !selected || gameWon) return;
      if (/^[1-4]$/.test(e.key)) updateCell(parseInt(e.key));
      else if (e.key === 'Backspace' || e.key === 'Delete') updateCell(0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, selected, updateCell, gameWon]);

  const startNewGame = () => {
    const newGame = createNewGame(isEasy, isHard);
    setGame(newGame); 
    setUserBoard(newGame.puzzle);
    setSelected(null); 
    setTime(0); 
    setIsActive(true); 
    setGameWon(false);
  };

  // Updated for 2x2 quadrants
  const renderQuadrant = (startRow, startCol) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 70px)', gap: '1px', bgcolor: '#ccc' }}>
      {userBoard.slice(startRow, startRow + 2).map((row, relativeR) => {
        const r = startRow + relativeR;
        return row.slice(startCol, startCol + 2).map((cell, relativeC) => {
          const c = startCol + relativeC;
          const isSelected = selected?.r === r && selected?.c === c;
          const isClue = game.puzzle[r][c] !== 0;
          const isWrong = cell !== 0 && !isClue && cell !== game.solution[r][c];

          return (
            <Box
              key={`${r}-${c}`}
              onClick={() => !gameWon && setSelected({ r, c })}
              sx={{
                width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: isSelected ? '#bbdefb' : (isWrong ? '#ffebee' : 'white'),
                color: isClue ? '#1976d2' : (isWrong ? '#d32f2f' : '#000'),
                cursor: isClue || gameWon ? 'default' : 'pointer',
                fontSize: '2.5rem !important',
                fontWeight: isClue ? 900 : 500,
                transition: 'background-color 0.2s',
                '&:hover': { bgcolor: isClue ? 'white' : '#e3f2fd' }
              }}
            >
              {cell !== 0 ? cell : ''}
            </Box>
          );
        });
      })}
    </Box>
  );

  return (
    <>
    <StandardHeader previousPath="/spiele"/>
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>4x4 Sudoku</Typography>
      
      {/* Timer & Controls */}
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
        <Paper elevation={2} sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa' }}>
          <TimerIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
          <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
            {formatTime(time)}
          </Typography>
        </Paper>
        {!gameWon && (
          <Button onClick={() => setIsActive(!isActive)} variant="outlined" size="small">
            {isActive ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        )}
      </Stack>

      {/* The Board */}
      <Paper elevation={12} sx={{ p: '4px', display: 'inline-block', bgcolor: '#000', position: 'relative' }}>
        {!isActive && !gameWon && (
          <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
            <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>Weiter</Button>
          </Box>
        )}

        <Box>
          <Stack direction="row">
            {renderQuadrant(0, 0)} 
            <Box sx={{ width: '4px', bgcolor: '#000' }} />
            {renderQuadrant(0, 2)}
          </Stack>
          <Box sx={{ height: '4px', bgcolor: '#000' }} /> 
          <Stack direction="row">
            {renderQuadrant(2, 0)} 
            <Box sx={{ width: '4px', bgcolor: '#000' }} />
            {renderQuadrant(2, 2)}
          </Stack>
        </Box>
      </Paper>

      {/* Input Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 5 }}>
        {[1, 2, 3, 4].map(n => (
          <Button 
            key={n} 
            variant="contained" 
            disabled={!isActive || gameWon} 
            onClick={() => updateCell(n)} 
            sx={{ minWidth: 65, height: 65, fontSize: '1.8rem', fontWeight: 'bold' }}
          >
            {n}
          </Button>
        ))}
        <Button 
          variant="outlined" 
          onClick={() => updateCell(0)} 
          disabled={!isActive || gameWon}
          sx={{ minWidth: 65, height: 65, fontWeight: 'bold' }}
        >
          DEL
        </Button>
      </Stack>

      {/* Win Dialog - No changes needed here, works for both! */}
      <EndMenuNewGame 
        gameWon={gameWon} 
        winText={"GEWINNER!"}
        winAnswer={`Zeit: ${formatTime(time)}`}
        restart={startNewGame}
        backLink={`/spiele`}
      />
    </Container>
    </>
  );
};