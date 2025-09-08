import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Modal from './Modal';
export default function EmailInput() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation simple côté client
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez indiquer une adresse email valide');
      return;
    }

    try {
      const res = await fetch('https://formspree.io/f/xgeepoge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail('');
      } else {
        setError('Oups, une erreur est survenue. Réessayez.');
      }
    } catch {
      setError('Impossible de se connecter. Vérifiez votre connexion.');
    }
  };

  return (
    <>
      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row sm:items-center sm:bg-[#49709A] sm:rounded-full sm:overflow-hidden w-full max-w-md my-4 text-xl gap-2 sm:gap-0"
      >
        {/* Input */}
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="px-6 py-4 rounded-full sm:rounded-none sm:flex-1 
                     bg-[#49709A] sm:bg-transparent 
                     text-white placeholder-white focus:outline-none"
        />

        {/* Bouton */}
        <button
          type="submit"
          className="group relative flex items-center justify-between gap-3 
                     bg-gold hover:bg-dark-gold text-gray-900 
                     px-5 py-4 rounded-full sm:rounded-full 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-white font-light"
        >
          <span>Me notifier</span>
          <span className="grid place-items-center w-8 h-8 rounded-full bg-white/60 overflow-hidden transition-transform duration-300 group-hover:translate-x-2">
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>
      </form>

      {/* Message d’erreur inline */}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {/* Popup de succès */}
      {success && <Modal setSuccess={setSuccess} />}
    </>
  );
}
