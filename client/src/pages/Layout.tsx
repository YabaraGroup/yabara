import { Outlet } from 'react-router';

function Layout() {
  return (
    <main className="background">
      <Outlet />
    </main>
  );
}

export default Layout;
