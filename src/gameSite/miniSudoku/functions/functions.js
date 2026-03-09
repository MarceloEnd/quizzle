// --- GENERATOR LOGIC (SAME AS BEFORE) ---
const isValid = (board, row, col, num) => {
  for (let i = 0; i < 6; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 2) * 2;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

export const createNewGame = (isEasy,isHard) => {
  let clues = 16;
  if(isEasy){
    clues = 18
  } else if(isHard){
    clues = 14
  }
  const board = Array.from({ length: 6 }, () => Array(6).fill(0));
  const solve = () => {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        if (board[row][col] === 0) {
          const nums = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5);
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
  let removed = 0;
  while (removed < (36 - clues)) {
    const r = Math.floor(Math.random() * 6);
    const c = Math.floor(Math.random() * 6);
    if (board[r][c] !== 0) {
      board[r][c] = 0;
      removed++;
    }
  }
  const puzzleId = btoa(board.flat().join('')).substring(0, 8);
  return { puzzle: board, solution, id: puzzleId };
};