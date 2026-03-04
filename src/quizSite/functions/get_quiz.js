import questions from '../questions/all.json';

export const getQuiz = (id) => {
    if (Number.isNaN(id)) {
        id = 1;
        return questions;
    }
    else if (id === 2){
        return questions;
    }
    return questions;
};

