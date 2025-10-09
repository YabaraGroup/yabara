import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#f3f8fc]">
      {/* Sidebar 20% */}
      <div className="w-full md:w-[20%] text-white flex flex-col">
        <Sidebar />
      </div>

      {/* Contenu principal 80% */}
      <div className="w-full md:w-[80%] p-6 overflow-y-auto bg-white rounded-lg shadow-lg mr-5 my-5">
        <Outlet />
      </div>
    </div>
  );
}
