import { ArrowRight } from 'lucide-react';

export default function EmailInput() {
  return (
    <div className="flex items-center bg-[#49709A] rounded-full overflow-hidden w-full max-w-md my-4 text-xl">
      <input
        type="email"
        placeholder="Adresse e-mail"
        className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white focus:outline-none"
      />

      <button
        className="group relative flex items-center gap-3 bg-gold hover:bg-dark-gold 
                   text-gray-900 font-semibold px-5 py-4 rounded-full transition-colors 
                   focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <span>Me notifier</span>

        <span className="grid place-items-center w-8 h-8 rounded-full bg-white/60 overflow-hidden">
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
}
