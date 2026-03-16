// --- GENERATOR LOGIC (4x4 SUDOKU) ---

const isValid = (board, row, col, num) => {
  // Check row and column
  for (let i = 0; i < 4; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  // Check 2x2 subgrid
  // startRow and startCol will always be 0 or 2
  const startRow = Math.floor(row / 2) * 2;
  const startCol = Math.floor(col / 2) * 2;
  
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

export const createNewGame = (difficulty = 'medium') => {
  // Clues logic for a 16-cell board
  let clues = 8; // Default medium
  if (difficulty === 'easy') clues = 10;
  if (difficulty === 'hard') clues = 6;

  const board = Array.from({ length: 4 }, () => Array(4).fill(0));

  const solve = () => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
          const nums = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
          for (let num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve()) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve();
  const solution = board.map(r => [...r]);

  // Remove cells to create the puzzle
  let removed = 0;
  const totalCells = 16;
  while (removed < (totalCells - clues)) {
    const r = Math.floor(Math.random() * 4);
    const c = Math.floor(Math.random() * 4);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      removed++;
    }
  }

  const puzzleId = btoa(board.flat().join('')).substring(0, 8);
  return { puzzle: board, solution, id: puzzleId };
};