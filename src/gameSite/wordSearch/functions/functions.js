import data from './questions.json';

/**
 * Gibt den passenden Eintrag zur ID zurück.
 * @param {number} id - Die gesuchte ID (1-20)
 * @returns {object|null} - Das JSON-Objekt oder null, falls nichts gefunden wurde.
 */

export const getKategorieById = (id) => {
  // .find() sucht das erste Element, auf das die Bedingung zutrifft
  const entry = data.find((item) => item.id === id);
  
  return entry || null;
};


export const categoriesWordSearch = () => {
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