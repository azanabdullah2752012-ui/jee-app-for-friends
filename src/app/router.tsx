import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { LandingPage } from '../pages/LandingPage';
import { AuthPage } from '../pages/AuthPage';
import { HomePage } from '../pages/HomePage';
import { RoadmapPage } from '../pages/RoadmapPage';
import { SubjectsPage } from '../pages/SubjectsPage';
import { RevisionPage } from '../pages/RevisionPage';
import { MistakesPage } from '../pages/MistakesPage';
import { ResourcesPage } from '../pages/ResourcesPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { AiTutorPage } from '../pages/AiTutorPage';
import { StorePage } from '../pages/StorePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/onboarding',
    element: <AuthPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <HomePage />,
      },
      {
        path: '/ai-tutor',
        element: <AiTutorPage />,
      },
      {
        path: '/store',
        element: <StorePage />,
      },
      {
        path: '/roadmap',
        element: <RoadmapPage />,
      },
      {
        path: '/subjects',
        element: <SubjectsPage />,
      },
      {
        path: '/revision',
        element: <RevisionPage />,
      },
      {
        path: '/mistakes',
        element: <MistakesPage />,
      },
      {
        path: '/resources',
        element: <ResourcesPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
