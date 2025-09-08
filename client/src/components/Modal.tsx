import { CheckCircle2 } from 'lucide-react';
import CardAvatar from './CardAvatar';

function Modal({ setSuccess }: { setSuccess: (value: boolean) => void }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
                bg-black/20 backdrop-blur-md z-50"
    >
      <div
        className="bg-dark-blue/90 backdrop-blur-md rounded-2xl p-8 
                  max-w-md text-center shadow-2xl text-white"
      >
        <div className="relative w-12 h-12 mx-auto mb-4">
          <span className="absolute inset-0 rounded-full bg-[#68EDC6] blur-xl opacity-70 animate-pulse" />

          <CheckCircle2 className="relative w-12 h-12 text-[#68EDC6]" />
        </div>{' '}
        <h2 className="text-xl font-semibold mb-6">Bienvenue dans le cercle des premiers 🙌</h2>
        <p className="mb-6 font-light">
          Tu fais désormais partie des pionniers Yabara. Une invitation exclusive t’attend dès le
          lancement.
        </p>
        <CardAvatar />
        <button
          onClick={() => setSuccess(false)}
          className="bg-gold hover:bg-dark-gold text-gray-900 px-6 py-3 rounded-full font-medium transition mt-6"
        >
          Retour à la page d’accueil
        </button>
      </div>
    </div>
  );
}

export default Modal;
