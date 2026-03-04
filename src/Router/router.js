import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { StartSite } from '../startSite/StartSite';
import { QuizSite } from '../quizSite/QuizSite';
import { QuizOverviewSite } from '../quizOverviewSite/QuizOverviewSite';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <StartSite /> },
      { path: "quizliste", element: <QuizOverviewSite /> },
      { path: "quiz/:id", element: <QuizSite /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}