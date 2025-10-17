// src/pages/signup/talent/TalentLayout.tsx
import { Outlet } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';

export default function TalentLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-light-blue p-6 md:p-10 gap-6 md:gap-10">
      {/* Colonne gauche : formulaire */}
      <div className="flex flex-col justify-center w-full md:w-[40%] bg-white rounded-xl shadow-lg px-8 py-12">
        <img src="/logo.png" alt="Yabara Logo" className="h-10 mb-8" />

        <Outlet />

        {/* Social login */}
        <div className="flex items-center my-8">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-4 text-gray-500 text-sm">ou</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
          <FaLinkedin className="text-[#0A66C2]" size={18} />
          <span>Continuer avec LinkedIn</span>
        </button>
        <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition mt-4">
          <FcGoogle size={18} />
          <span>Continuer avec Google</span>
        </button>
      </div>

      {/* Colonne droite : image */}
      <div className="hidden md:flex md:w-[60%] relative rounded-xl overflow-hidden shadow-lg">
        <img
          src="/images/signup-hero.png"
          alt="Connexion Yabara"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-25" />
        <div className="absolute bottom-10 left-10 text-white drop-shadow-lg">
          <h3 className="text-4xl font-semibold">Accédez à la plateforme</h3>
          <p className="text-gray-200 text-2xl">
            Et entrez en contact avec des millions de talents
          </p>
        </div>
      </div>
    </div>
  );
}
