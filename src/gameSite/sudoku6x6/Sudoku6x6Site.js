import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Box, Paper, Typography, Container, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';
import { createNewGame } from './functions/functions';
import { StandardHeader } from '../../components/StandardHeader';
import { useSearchParams } from 'react-router-dom';

export const Sudoku6x6Site = () => {
  const [searchParams] = useSearchParams();
  const isHard = searchParams.has('schwer');
  const isEasy = searchParams.has('leicht');
  const [game, setGame] = useState(() => createNewGame(isEasy,isHard));
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

  useEffect(() => {
    const isSolved = userBoard.every((row, r) => row.every((cell, c) => cell === game.solution[r][c]));
    if (isSolved && !gameWon) { 
      setGameWon(true); 
      setIsActive(false); 
    }
  }, [userBoard, game.solution, gameWon]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive || !selected || gameWon) return;
      if (/^[1-6]$/.test(e.key)) updateCell(parseInt(e.key));
      else if (e.key === 'Backspace' || e.key === 'Delete') updateCell(0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, selected, updateCell, gameWon]);

  const startNewGame = () => {
    const newGame = createNewGame();
    setGame(newGame); 
    setUserBoard(newGame.puzzle);
    setSelected(null); 
    setTime(0); 
    setIsActive(true); 
    setGameWon(false);
  };

  const renderQuadrant = (startRow, startCol) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '1px', bgcolor: '#ccc' }}>
      {userBoard.slice(startRow, startRow + 2).map((row, relativeR) => {
        const r = startRow + relativeR;
        return row.slice(startCol, startCol + 3).map((cell, relativeC) => {
          const c = startCol + relativeC;
          const isSelected = selected?.r === r && selected?.c === c;
          const isClue = game.puzzle[r][c] !== 0;
          const isWrong = cell !== 0 && !isClue && cell !== game.solution[r][c];

          return (
            <Box
              key={`${r}-${c}`}
              onClick={() => !gameWon && setSelected({ r, c })}
              sx={{
                width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: isSelected ? '#bbdefb' : (isWrong ? '#ffebee' : 'white'),
                color: isClue ? '#1976d2' : (isWrong ? '#d32f2f' : '#000'),
                cursor: isClue || gameWon ? 'default' : 'pointer',
                fontSize: '2.2rem !important',
                fontWeight: isClue ? 900 : 500,
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
    <StandardHeader />
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>6x6 Sudoku</Typography>
      
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

      <Paper elevation={12} sx={{ p: '4px', display: 'inline-block', bgcolor: '#000', position: 'relative' }}>
        {!isActive && !gameWon && (
          <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
            <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>Weiter</Button>
          </Box>
        )}

        <Box>
          <Stack direction="row">
            {renderQuadrant(0, 0)} 
            <Box sx={{ width: '3px', bgcolor: '#000' }} />
            {renderQuadrant(0, 3)}
          </Stack>
          <Box sx={{ height: '3px', bgcolor: '#000' }} /> 
          <Stack direction="row">
            {renderQuadrant(2, 0)} 
            <Box sx={{ width: '3px', bgcolor: '#000' }} />
            {renderQuadrant(2, 3)}
          </Stack>
          <Box sx={{ height: '3px', bgcolor: '#000' }} /> 
          <Stack direction="row">
            {renderQuadrant(4, 0)} 
            <Box sx={{ width: '3px', bgcolor: '#000' }} />
            {renderQuadrant(4, 3)}
          </Stack>
        </Box>
      </Paper>

      <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 5 }}>
        {[1, 2, 3, 4, 5, 6].map(n => (
          <Button key={n} variant="contained" disabled={!isActive || gameWon} onClick={() => updateCell(n)} sx={{ minWidth: 55, height: 55, fontSize: '1.5rem', fontWeight: 'bold' }}>{n}</Button>
        ))}
      </Stack>

      {/* --- ENDSCREEN DIALOG --- */}
      <Dialog open={gameWon} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, textAlign: 'center' } }}>
        <DialogTitle sx={{ pt: 4 }}>
          <EmojiEventsIcon sx={{ fontSize: 80, color: '#ffc107', mb: 1 }} />
          <Typography variant="h4" fontWeight="900">GEWINNER!</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ my: 3, p: 2, bgcolor: '#f0f7ff', borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
               Zeit: {formatTime(time)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
          <Button variant="contained" size="large" onClick={startNewGame} fullWidth sx={{ mx: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}>
            Neues Spiel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>
  );
};