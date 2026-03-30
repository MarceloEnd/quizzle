import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

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
import { SpotTheDifferenceSite } from '../gameSite/spotTheDifference/SpotTheDifferenceSite';
import { WordSearchOverviewSite } from '../gameSite/wordSearch/WordSearchOverviewSite';
import { WordSearchSite } from '../gameSite/wordSearch/WordSearchSite';
import { EinmalEinsSite } from '../gameSite/1x1/1x1normalSite';
import { EinmalEinsTimeAttackSite } from '../gameSite/1x1/1x1timeSite';
import { GeteiltSite } from '../gameSite/1x1/1x1geteiltSite';
import { Box } from '@mui/material';
import { Footer } from '../components/Footer';
import { AdComponent } from '../components/AdComponent';
import { AgbSite } from '../agbSite/AgbSite';
import { ImpressumSite } from '../impressumSite/ImpressumSite';
import { WimmelbilderOverviewSite } from '../gameSite/wimmelbild/WimmelbildOverviewSite';
import { WimmelbildSite } from '../gameSite/wimmelbild/WimmelbildSite';
import { LesemausOverviewSite } from '../gameSite/lesemaus/LesemausOverviewSite';
import { LesemausSite } from '../gameSite/lesemaus/LesemausSite';

const RootLayout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Outlet /> {/* This renders StartSite, QuizSite, etc. */}
    </Box>
    <AdComponent adSlot="f08c47fec0942fa0" key={window.location.pathname} />
    <Footer />
  </Box>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
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
      { path: "spiele/fehler", element: <SpotTheDifferenceSite /> },
      { path: "spiele/wortsucheliste", element: <WordSearchOverviewSite /> },
      { path: "spiele/wortsuche/:id", element: <WordSearchSite /> },
      { path: "spiele/1x1", element: <EinmalEinsSite /> },
      { path: "spiele/1x1zeit", element: <EinmalEinsTimeAttackSite /> },
      { path: "spiele/1x1geteilt", element: <GeteiltSite /> },
      { path: "agb", element: <AgbSite/> },
      { path: "impressum", element: <ImpressumSite /> },
      { path: "spiele/wimmelbildliste", element: <WimmelbilderOverviewSite /> },
      { path: "spiele/wimmelbild/:id", element: <WimmelbildSite /> },
      { path: "spiele/lesemausliste", element: <LesemausOverviewSite /> },
      { path: "spiele/lesemaus/:id", element: <LesemausSite /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}