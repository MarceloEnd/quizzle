import data from './questions.json';

/**
 * Gibt den passenden Eintrag zur ID zurück.
 * @param {number} id - Die gesuchte ID (1-20)
 * @returns {object|null} - Das JSON-Objekt oder null, falls nichts gefunden wurde.
 */

export const getKategorieById = (id) => {
    const entry = data.find(item => item.id === id);
    if (!entry) return null;

    const word = entry.wort.toUpperCase().split('');
    
    // Attempt to find a valid "Snake Path" on a 3x3 grid
    let grid = null;
    let attempts = 0;

    while (!grid && attempts < 100) {
        grid = generateSnakePath(word);
        attempts++;
    }

    return {
        ...entry,
        grid: grid || [["?", "?", "?"], ["?", "?", "?"], ["?", "?", "?"]] // Fallback
    };
};

const generateSnakePath = (letters) => {
    // Initialize empty 3x3 grid
    const grid = Array(3).fill(null).map(() => Array(3).fill(null));
    
    // Start at a random position
    let currR = Math.floor(Math.random() * 3);
    let currC = Math.floor(Math.random() * 3);
    
    grid[currR][currC] = letters[0];

    for (let i = 1; i < letters.length; i++) {
        const neighbors = [];
        
        // Check all 8 directions (including diagonals like in your image)
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                
                const nr = currR + dr;
                const nc = currC + dc;

                if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3 && grid[nr][nc] === null) {
                    neighbors.push([nr, nc]);
                }
            }
        }

        if (neighbors.length === 0) return null; // Stuck, try again

        // Pick a random neighbor
        const [nextR, nextC] = neighbors[Math.floor(Math.random() * neighbors.length)];
        grid[nextR][nextC] = letters[i];
        currR = nextR;
        currC = nextC;
    }

    return grid;
};


export const categoriesWortSchlange = () => {
  // Wir erstellen ein Mapping, um sicherzustellen, dass jede Kategorie nur einmal vorkommt
  // (Falls deine IDs 1-20 alle einzigartig sind, reicht ein einfaches .map)
  const uniqueEntries = data.map(item => ({
    id: item.id,
    kategorie: item.kategorie
  }));

  // Sortierung alphabetisch nach dem Kategorienamen
  //.sort((a, b) => a.kategorie.localeCompare(b.kategorie))
  return uniqueEntries;
};