import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdHelpCenter, MdLogout } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { FaSquarePlus } from 'react-icons/fa6';
import { PiMedalLight } from 'react-icons/pi';
import { FiUserPlus } from 'react-icons/fi';
import { IoHomeOutline } from 'react-icons/io5';
import { GoGear } from 'react-icons/go';

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/login');
  };

  const NavigationLinks = [
    { to: `/app/company/dashboard/${user?.id_company}`, label: 'Accueil', icon: <IoHomeOutline /> },
    { to: '/app/company/recrutement', label: 'Recrutement', icon: <FiUserPlus /> },
    { to: '/app/company/chercher', label: 'Chercher un talent', icon: <IoIosSearch /> },
    { to: '/app/company/recompenses', label: 'Récompenses', icon: <PiMedalLight /> },
    { to: '/app/company/reglages', label: 'Réglages', icon: <GoGear /> },
  ];

  return (
    <div className="flex flex-col justify-between h-full m-5 p-6 bg-[#314466] rounded-lg shadow-lg">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <img src="/logo.png" alt="Yabara Logo" className="h-8" />
        </div>

        {/* Bouton principal */}
        <button className="w-full bg-gold  font-semibold py-2 px-4 rounded-md hover:bg-dark-gold transition mb-6 flex items-center justify-center gap-2">
          <FaSquarePlus size={24} />
          Publier une offre
        </button>

        {/* Navigation */}
        <nav className="space-y-2">
          {NavigationLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#406087] transition ${
                  isActive ? 'bg-[#406087]' : ''
                }`
              }
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bas de la sidebar */}
      <div className="border-t border-[#223767] pt-6 space-y-4">
        <NavLink
          to="/app/help"
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#406087] transition"
        >
          <MdHelpCenter /> Centre d’aide
        </NavLink>
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#406087] transition text-left w-full"
          onClick={handleClick}
        >
          <MdLogout /> Se déconnecter
        </button>

        {/* Profil */}
        <div className="flex items-center gap-3 mt-6 rounded-md px-3 py-2 border-4 border-[#406087]">
          <img
            src={`https://avatar.iran.liara.run/username?username=${user?.firstname} ${user?.lastname}`}
            alt={`${user?.firstname} ${user?.lastname}`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm ">
            <p className="font-semibold">{`${user?.firstname} ${user?.lastname}`}</p>
            <p className="text-gray-300 text-xs">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
