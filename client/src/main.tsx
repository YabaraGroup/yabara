import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

import './index.css';

/** Import Pages */
import App from './App';
import SignUpWizard from './pages/SignUpWizard';
import { StepProvider } from './context/StepContext';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

/** TALENT */
import Layout from './pages/Talent/Layout';
import Profile from './pages/Talent/Profile';
import ProtectedRoute from './components/ProtectedRoute';

/** COMPANY */
import LayoutCompany from './pages/Company/Layout';
import ProfileCompany from './pages/Company/Profile';
import Dashboard from './pages/Company/Dashboard';

// Find the root element in the HTML document
const rootElement = document.getElementById('root');
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/app',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile/talent',
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: '/app/company',
    element: <LayoutCompany />,
    children: [
      {
        path: 'profile',
        element: <ProfileCompany />,
      },
      {
        path: 'dashboard/:id_company',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUpWizard />,
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <StepProvider>
        <RouterProvider router={router} />
      </StepProvider>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
);
