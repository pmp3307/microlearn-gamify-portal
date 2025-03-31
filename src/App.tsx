import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import ModulesList from './pages/ModulesList';
import ModuleDetail from './pages/ModuleDetail';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
import Roadmap from './pages/Roadmap';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/modules",
    element: <ModulesList />
  },
  {
    path: "/modules/:moduleId",
    element: <ModuleDetail />
  },
  {
    path: "/analytics",
    element: <Analytics />
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />
  },
  {
    path: "/roadmap",
    element: <Roadmap />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
