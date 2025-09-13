import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Modal from './Modal';
import api from '../utils/fetch'; // ton instance axios

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: any) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

// On met l'endpoint une seule fois ici
const ENDPOINT = '/api/comingsoon';

export default function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [startedAt] = useState(() => Date.now()); // tempo anti-bot
  const [token, setToken] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // --- Setup Turnstile widget ---
  useEffect(() => {
    let interval: number | undefined;

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(null),
        action: 'email',
      });

      if (interval) window.clearInterval(interval);
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      interval = window.setInterval(renderWidget, 200);
    }

    return () => {
      if (interval) window.clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, []);

  // --- Validation email simple ---
  const validateEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  // --- Soumission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !validateEmail(email)) {
      setError('Veuillez indiquer une adresse email valide');
      return;
    }

    if (!token) {
      setError('Vérification anti-bot en cours… Réessayez dans une seconde.');
      return;
    }

    setLoading(true);

    try {
      const honeypot =
        (document.getElementById('website-hp') as HTMLInputElement | null)?.value ?? '';

      const payload = {
        email,
        message: 'newsletter_signup',
        startedAt,
        website: honeypot,
        turnstileToken: token,
      };

      const res = await api.post(ENDPOINT, payload);

      if (res.status === 200) {
        setSuccess(true);
        setEmail('');
      } else {
        setError('Oups, une erreur est survenue. Réessayez.');
      }
    } catch (err: any) {
      const data = err.response?.data;

      if (data?.error === 'captcha_failed') {
        setError('Échec de la vérification anti-bot. Réessayez.');
      } else if (data?.error === 'too_fast') {
        setError('Trop rapide. Réessayez dans 2–3 secondes.');
      } else if (data?.error === 'bot_detected') {
        setError('Requête suspecte bloquée.');
      } else {
        setError("Impossible d'envoyer la requête. Vérifiez votre connexion.");
      }
    } finally {
      setLoading(false);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {}
      }
      setToken(null);
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

        {/* Honeypot */}
        <input
          id="website-hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] top-auto w-px h-px opacity-0"
        />

        {/* Bouton */}
        <button
          type="submit"
          disabled={!token || loading}
          className="group relative flex items-center justify-between gap-3 
                     bg-gold hover:bg-dark-gold text-gray-900 
                     px-5 py-4 rounded-full sm:rounded-full 
                     transition-colors focus:outline-none focus:ring-2 focus:ring-white font-light
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span>{loading ? 'Envoi…' : 'Me notifier'}</span>
          <span className="grid place-items-center w-8 h-8 rounded-full bg-white/60 overflow-hidden transition-transform duration-300 group-hover:translate-x-2">
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>
      </form>

      {/* Widget Turnstile */}
      <div ref={containerRef} className="mt-2 sm:mt-0 sm:ml-3" />

      {/* Erreurs */}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {/* Modal succès */}
      {success && <Modal setSuccess={setSuccess} />}
    </>
  );
}
