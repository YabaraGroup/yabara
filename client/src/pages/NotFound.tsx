import { Link } from 'react-router-dom';
function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-gold dark:text-gold">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
          Oups, il n’y a rien ici.
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
          Désolé, nous n’avons pas pu trouver la page que vous recherchez.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-gold px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-dark-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold dark:text-gold dark:hover:bg-gold dark:focus-visible:outline-dark-gold"
          >
            Retour à l'accueil
          </Link>
          <Link to="/support" className="text-sm font-semibold text-gray-900 dark:text-white">
            Contacter le support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
