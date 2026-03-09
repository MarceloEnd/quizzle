import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StartSite } from '../startSite/StartSite';
import { QuizSite } from '../quizSite/QuizSite';
import { QuizOverviewSite } from '../quizSite/QuizOverviewSite';
import { JokeOverviewSite } from '../jokeSite/JokeOverviewSite';
import { JokeSite } from '../jokeSite/JokeSite';
import { GameOverviewSite } from '../gameSite/GameOverviewSite';
import { MiniSudokuSite } from '../gameSite/miniSudoku/MiniSudokuSite';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <StartSite /> },
      { path: "quizliste", element: <QuizOverviewSite /> },
      { path: "quiz/:id", element: <QuizSite /> },
      { path: "witzliste", element: <JokeOverviewSite /> },
      { path: "witz/:id", element: <JokeSite /> },
      { path: "spieleliste", element: <GameOverviewSite /> },
      { path: "spiele/minisudoku", element: <MiniSudokuSite /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}