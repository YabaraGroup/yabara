import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Layout() {
  return (
    <main className="background min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default Layout;
