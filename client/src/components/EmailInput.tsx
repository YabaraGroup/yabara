import { ArrowRight } from 'lucide-react';

export default function EmailInput() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:bg-[#49709A] sm:rounded-full sm:overflow-hidden w-full max-w-md my-4 text-xl gap-2 sm:gap-0">
      {/* Input */}
      <input
        type="email"
        placeholder="Adresse e-mail"
        className="px-6 py-4 rounded-full sm:rounded-none sm:flex-1 
                   bg-[#49709A] sm:bg-transparent 
                   text-white placeholder-white focus:outline-none"
      />

      {/* Bouton */}
      <button
        className="group relative flex items-center justify-between	gap-3 
                   bg-gold hover:bg-dark-gold text-gray-900 
                   px-5 py-4 rounded-full sm:rounded-full 
                   transition-colors focus:outline-none focus:ring-2 focus:ring-white font-light"
      >
        <span>Me notifier</span>

        <span className="grid place-items-center w-8 h-8 rounded-full bg-white/60 overflow-hidden transition-transform duration-300 group-hover:translate-x-2">
          <ArrowRight className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
}
