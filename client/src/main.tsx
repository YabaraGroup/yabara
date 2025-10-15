import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';

/* ------------------- CONTEXTS ------------------- */
import { AuthProvider } from './context/AuthContext';
import { StepProvider } from './context/StepContext';

/* ------------------- PAGES GLOBALES ------------------- */
import App from './App';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

/* ------------------- TALENT ------------------- */
import LayoutTalent from './pages/Talent/Layout';
import ProfileTalent from './pages/Talent/Profile';

/* ------------------- COMPANY ------------------- */
import LayoutCompany from './pages/Company/Layout';
import ProfileCompany from './pages/Company/Profile';
import Dashboard from './pages/Company/Dashboard';

/* ------------------- SIGNUP ------------------- */
import SignUpCommon from './pages/Signup/SignUpCommon';
import { CompanyLayout, TalentLayout } from './pages/Signup';

/* ------------------- ROUTER CONFIG ------------------- */
const router = createBrowserRouter([
  /* --------- HOME / PUBLIC --------- */
  {
    path: '/',
    element: <LayoutTalent />, // Layout par défaut (visiteur ou talent)
    children: [{ index: true, element: <App /> }],
  },

  /* --------- LOGIN --------- */
  { path: '/login', element: <Login /> },

  /* --------- SIGNUP (ÉTAPE COMMUNE) --------- */
  {
    path: '/signup',
    children: [
      // Étape 1 : commune
      { path: 'company', element: <SignUpCommon /> },
      { path: 'talent', element: <SignUpCommon /> },

      // Étapes suivantes du flow d’inscription
      {
        path: 'company-flow',
        element: <CompanyLayout />,
      },
      { path: 'talent-flow', element: <TalentLayout /> },
    ],
  },

  /* --------- ESPACE TALENT --------- */
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'talent',
        element: <LayoutTalent />,
        children: [{ path: 'profile', element: <ProfileTalent /> }],
      },
    ],
  },

  /* --------- ESPACE ENTREPRISE --------- */
  {
    path: '/app/company',
    element: <ProtectedRoute />,
    children: [
      {
        element: <LayoutCompany />,
        children: [
          { path: 'profile', element: <ProfileCompany /> },
          { path: 'dashboard/:id_company', element: <Dashboard /> },
        ],
      },
    ],
  },

  /* --------- 404 --------- */
  { path: '*', element: <NotFound /> },
]);

/* ------------------- RENDER APP ------------------- */
const root = document.getElementById('root');
if (!root) throw new Error('Missing <div id="root"></div> in index.html');

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <StepProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </StepProvider>
    </AuthProvider>
  </StrictMode>,
);
