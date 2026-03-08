import jokes from '../jokes/jokes.json';

export const categories = () => {
    const uniqueThemen = [...new Set(jokes.map(item => item.Themenbereich))];
    return uniqueThemen.sort((a, b) => a.localeCompare(b));
}


export const selectedJokes = (id) => {
    const category = categories()[id];
    const results = jokes.filter(item => item.Themenbereich === category).map(item => item.Inhalt);
    return results;
}
