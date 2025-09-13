import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Modal from './Modal';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: any) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

const ENDPOINT = 'http://localhost:3310/api/comingsoon';

export default function EmailInput() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // Anti-bot : tempo minimal
  const [startedAt] = useState<number>(() => Date.now());

  // Turnstile
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Petite aide pour attendre que le script Turnstile soit prêt
  useEffect(() => {
    let interval: number | undefined;

    const tryRender = () => {
      if (!containerRef.current || !window.turnstile) return;
      // Rend le widget et récupère l'id pour reset après submit
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(null),
        action: 'email', // optionnel, cohérent avec la vérif serveur
      });
      // une fois rendu, on arrête de poll
      if (interval) window.clearInterval(interval);
    };

    if (window.turnstile) {
      tryRender();
    } else {
      // le script est async → on poll très légèrement
      interval = window.setInterval(tryRender, 200);
    }

    return () => {
      if (interval) window.clearInterval(interval);
      // Nettoyage éventuel du widget si besoin
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, []);

  const validateEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !validateEmail(email)) {
      setError('Veuillez indiquer une adresse email valide');
      return;
    }
    if (!token) {
      setError('Vérification anti-bot en cours… Patientez une seconde puis réessayez.');
      return;
    }

    setLoading(true);
    try {
      // Honeypot : ce champ DOIT rester vide (on le lit depuis le DOM)
      const honeypot =
        (document.getElementById('website-hp') as HTMLInputElement | null)?.value ?? '';

      const payload = {
        email,
        // Si ton backend suit mon exemple Zod (message requis), on met un message par défaut :
        message: 'newsletter_signup',
        startedAt,
        website: honeypot, // honeypot
        turnstileToken: token, // token Turnstile → vérifié côté serveur
      };

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        // remonte les erreurs "connues"
        if (data?.error === 'captcha_failed')
          setError('Échec de la vérification anti-bot. Réessayez.');
        else if (data?.error === 'too_fast') setError('Trop rapide. Réessayez dans 2–3 secondes.');
        else if (data?.error === 'bot_detected') setError('Requête suspecte bloquée.');
        else setError('Oups, une erreur est survenue. Réessayez.');
      }
    } catch {
      setError('Impossible de se connecter. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
      // Reset du widget pour regénérer un token tout neuf
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

        {/* Honeypot (champ qui doit rester vide) */}
        <input
          id="website-hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          // Visuellement hors écran, ET pas focusable
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
      <div
        ref={containerRef}
        // Pour rester joli dans ton layout, on masque simplement l'espace si le widget est large
        className="mt-2 sm:mt-0 sm:ml-3"
      />

      {/* Message d’erreur inline */}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {/* Popup de succès */}
      {success && <Modal setSuccess={setSuccess} />}
    </>
  );
}
