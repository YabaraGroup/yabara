import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

import './index.css';

/** Import Pages */
import App from './App';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { StepProvider } from './context/StepContext';
import SignUpWizard from './pages/SignUpWizard';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUpWizard />,
      },
      {
        path: '/app',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
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
