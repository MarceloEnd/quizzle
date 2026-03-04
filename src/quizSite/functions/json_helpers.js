export const getRandomQuestions = (jsonInput, count = 10) => {
    // 1. Create a shallow copy so we don't mutate the original data
    const shuffled = [...jsonInput].sort(() => 0.5 - Math.random());
    // 2. Return the requested number of items
    return shuffled.slice(0, count);
};

