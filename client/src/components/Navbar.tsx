import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'First Link', href: '/' },
  { name: 'Second Link', href: '/' },
  { name: 'Third Link', href: '/' },
  { name: 'Fourth Link', href: '/' },
];
function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          {navigation.map(link => (
            <Link key={link.name} to={link.href} className="mr-5 hover:text-gold cursor-pointer">
              {link.name}
            </Link>
          ))}
        </nav>
        <div>
          {!isAuthenticated ? (
            <>
              <Link
                to="/signup"
                className="inline-flex items-center py-1 px-3 mr-1 text-base mt-4 md:mt-0"
              >
                S'inscrire
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center bg-gold border-0 py-1 px-3 hover:bg-gold rounded text-base mt-4 md:mt-0"
              >
                Connexion
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/app/profile"
                className="inline-flex items-center py-1 px-3 mr-1 text-base mt-4 md:mt-0"
              >
                Mon profil
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center bg-gold border-0 py-1 px-3 hover:bg-gold rounded text-base mt-4 md:mt-0"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
