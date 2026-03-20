import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StartSite } from '../startSite/StartSite';
import { QuizSite } from '../quizSite/QuizSite';
import { QuizOverviewSite } from '../quizSite/QuizOverviewSite';
import { JokeOverviewSite } from '../jokeSite/JokeOverviewSite';
import { JokeSite } from '../jokeSite/JokeSite';
import { GameOverviewSite } from '../gameSite/GameOverviewSite';
import { Sudoku6x6Site } from '../gameSite/sudoku6x6/Sudoku6x6Site';
import { Sudoku4x4Site } from '../gameSite/sudoku4x4/Sudoku4x4Site';
import { MemorySite } from '../gameSite/memory/MemorySite';
import { MathSquareSite } from '../gameSite/mathSquare/MathSquareSite';
import { MemoryColorSite } from '../gameSite/memory/MemoryColorSite';
import { MemoryVersusSite } from '../gameSite/memory/MemoryVersusSite';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <StartSite /> },
      { path: "quizliste", element: <QuizOverviewSite /> },
      { path: "quiz/:id", element: <QuizSite /> },
      { path: "witzliste", element: <JokeOverviewSite /> },
      { path: "witz/:id", element: <JokeSite /> },
      { path: "spiele", element: <GameOverviewSite /> },
      { path: "spiele/sudoku6x6", element: <Sudoku6x6Site /> },
      { path: "spiele/sudoku4x4", element: <Sudoku4x4Site /> },
      { path: "spiele/memory", element: <MemorySite /> },
      { path: "spiele/memorycolor", element: <MemoryColorSite /> },
      { path: "spiele/memoryversus", element: <MemoryVersusSite /> },
      { path: "spiele/rechnequadrat", element: <MathSquareSite /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}