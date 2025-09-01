import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';

import './index.css';

/** Import Pages */
import App from './App.tsx';
import NotFound from './pages/NotFound.tsx';
import Layout from './pages/Layout.tsx';
import Soon from './pages/Soon.tsx';

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
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/soon',
    element: <Soon />,
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
