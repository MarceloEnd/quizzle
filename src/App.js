import './App.css';
import React, { useState } from 'react';
import QuestionCard from './components/QuizArea';
import {QuizHeader} from './components/QuizHeader';
import { getRandomQuestions } from './functions/json_helpers';
import questions from './questions/all.json'
import QuizResult from './components/QuizEndScreen';

function App() {
  const quizData = getRandomQuestions(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore(score + 1);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
  };

  return (
    <div className="App">
      <QuizHeader
        currentQuestion = {currentIndex}
        score = {score}
        totalQuestions = {10}
      />
      { currentIndex < 10 &&
      <QuestionCard 
        data={quizData[currentIndex]}
        onNext={handleNext}
      />
      }
      <br/>
      <br/>
      {currentIndex > 9 &&
      <QuizResult 
        score = {score}
        total = {10}
        onRestart={handleRestart}
      />
      }
    </div>
  );
}

export default App;
