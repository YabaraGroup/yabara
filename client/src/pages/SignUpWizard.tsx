import { useStep } from '../context/StepContext';
import StepDot from '../components/StepDot';
import Step1 from './Signup/Step1';
import Step2 from './Signup/Step2';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';

export default function SignUpWizard() {
  const { step, accountType, setAccountType } = useStep();

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-light-blue p-4 md:p-8 gap-4 md:gap-8">
      {/* Colonne gauche : formulaire (40%) */}
      <div className="flex flex-col justify-center w-full md:w-[40%] bg-white rounded-lg shadow-lg px-6 md:px-12 py-10">
        {/* Logo */}
        <div className="mb-10 flex justify-start">
          <img src="/logo.png" alt="Yabara Logo" className="h-10" />
        </div>

        <h2 className="text-3xl font-bold mb-3">Diffusez votre première offre</h2>
        <p className="text-gray-500 mb-8">Veuillez remplir les champs suivants</p>

        <div className="flex items-center gap-3 mb-6 sm:flex-row flex-col">
          <span className="text-sm opacity-70">Type de compte :</span>
          <div className="inline-flex rounded-lg overflow-hidden border">
            <button
              type="button"
              onClick={() => setAccountType('user')}
              className={`px-4 py-2 text-sm ${accountType === 'user' ? 'bg-gold text-white' : 'bg-white text-gold'}`}
            >
              Talent
            </button>
            <button
              type="button"
              onClick={() => setAccountType('company')}
              className={`px-4 py-2 text-sm ${accountType === 'company' ? 'bg-gold text-white' : 'bg-white text-gold'}`}
            >
              Entreprise
            </button>
          </div>
        </div>

        {/* Indicateur d'étape */}
        <div className="flex items-center gap-4 mb-8">
          <StepDot active={step === 1} label="Compte" />
          <div className="h-px flex-1 bg-gray-200" />
          <StepDot active={step === 2} label="Informations" />
        </div>

        {/* Contenu des étapes */}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}

        {/* Séparateur */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-4 text-gray-500 text-sm">ou</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Boutons sociaux */}
        <div className="flex justify-between gap-4  ">
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
            <FaLinkedin className="text-[#0A66C2]" size={18} />
            <span>Continuer avec LinkedIn</span>
          </button>
          <button className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
            <FcGoogle size={18} />
            <span>Continuer avec Google</span>
          </button>
        </div>
      </div>

      {/* Colonne droite : image (60%) */}
      <div className="hidden md:flex md:w-[60%] relative rounded-lg overflow-hidden shadow-lg">
        {/* Image */}
        <img
          src="/images/login-hero.png"
          alt="Connexion Yabara"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-25" />
        <div className="absolute bottom-15 left-15 text-white drop-shadow-lg ">
          <h3 className="text-4xl font-semibold">Accédez à la plateforme</h3>
          <p className="text-gray-200 text-2xl ">
            Et entrez en contact avec des millions de talents
          </p>
        </div>
      </div>
    </div>
  );
}
