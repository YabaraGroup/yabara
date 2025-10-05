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
        path: '/app/login',
        element: <Login />,
      },
      {
        path: '/app/signup',
        element: <SignUpWizard />,
      },
    ],
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <StepProvider>
      <RouterProvider router={router} />
    </StepProvider>
    <ToastContainer />
  </StrictMode>,
);
