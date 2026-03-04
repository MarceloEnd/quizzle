import React, { useState } from 'react';
import { getRandomQuestions } from './functions/json_helpers';
import { QuizHeader } from './components/QuizHeader';
import { QuizResult } from './components/QuizEndScreen';
import { QuizArea } from './components/QuizArea';
import { useParams } from 'react-router-dom';
import { getQuiz } from './functions/get_quiz';

export const QuizSite = () => {
  const { id } = useParams();
  const quizId = parseInt(id)

  const quizData = getRandomQuestions(getQuiz(quizId));
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
    <div className="Quiz">
       <QuizHeader
              currentQuestion = {currentIndex}
              score = {score}
              totalQuestions = {10}
            />
            { currentIndex < 10 &&
            <QuizArea 
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