import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'First Link', href: '/app' },
  { name: 'Second Link', href: '/app' },
  { name: 'Third Link', href: '/app' },
  { name: 'Fourth Link', href: '/app' },
];
function Navbar() {
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
          <Link
            to="/app/signup"
            className="inline-flex items-center py-1 px-3 mr-1 text-base mt-4 md:mt-0"
          >
            S'inscrire
          </Link>
          <Link
            to="/app/login"
            className="inline-flex items-center bg-gold border-0 py-1 px-3 hover:bg-gold rounded text-base mt-4 md:mt-0"
          >
            Connexion
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
