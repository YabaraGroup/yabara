import { useStep } from '../context/StepContext';
import StepDot from '../components/StepDot';
import Step1 from './Signup/Step1';
import Step2 from './Signup/Step2';

export default function SignUpWizard() {
  const { step, accountType, setAccountType } = useStep();

  return (
    <section className="max-w-3xl mx-auto p-6">
      {/* Sélecteur de type de compte */}
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
    </section>
  );
}

/* --- Petits composants internes --- */
