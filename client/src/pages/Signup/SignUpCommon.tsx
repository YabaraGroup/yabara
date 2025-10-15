import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStep } from '../../context/StepContext';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import Field from '../../components/Field';
import { errorToast } from '../../utils/toast';
import ButtonType from '../../components/Button';

export default function SignUpCommon() {
  const location = useLocation();
  const isCompany = location.pathname.includes('/company');
  const isTalent = location.pathname.includes('/talent');
  const { user, setUser, nextStep } = useStep();
  const navigate = useNavigate();

  // ✅ Vérification des champs
  const checkValidations = () => {
    if (user.password !== user.confirmPassword) {
      errorToast('❌ Les mots de passe ne correspondent pas.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      errorToast('❌ Adresse email invalide.');
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(user.password)) {
      errorToast(
        '❌ Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.',
      );
      return false;
    }

    return true; // toutes les validations sont passées
  };

  // ✅ Gestion du changement de champ
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setUser((prev: any) => ({ ...prev, [name]: value }));
  };

  // ✅ Soumission du formulaire
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkValidations()) return;

    // passe à la suite selon le type de compte
    if (isCompany) {
      navigate('/signup/company-flow');
    } else if (isTalent) {
      navigate('/signup/talent-flow');
    }

    nextStep();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-light-blue p-4 md:p-8 gap-4 md:gap-8">
      {/* Colonne gauche : contenu */}
      <div className="flex flex-col justify-center w-full md:w-[40%] bg-white rounded-lg shadow-lg px-6 md:px-12 py-10">
        {/* Logo + titres */}
        <div>
          <Link to="/" className="mb-10 flex justify-start">
            <img src="/logo.png" alt="Yabara Logo" className="h-10" />
          </Link>

          <h1 className="text-4xl font-extralight">Diffusez votre première offre</h1>
          <h2 className="text-xl font-light text-gray-600 py-7">
            Veuillez remplir les champs suivants
          </h2>
        </div>

        {/* Formulaire */}
        <form className="space-y-4" onSubmit={onSubmit}>
          <Field
            label="Adresse email"
            name="email"
            type="email"
            value={user.email}
            onChange={onChange}
            required
          />
          <Field
            label="Mot de passe"
            name="password"
            type="password"
            value={user.password}
            onChange={onChange}
            required
          />
          <Field
            label="Confirmer le mot de passe"
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={onChange}
            required
          />

          <ButtonType text="Continuer" variant="primary" />
        </form>

        {/* Séparateur */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-4 text-gray-500 text-sm">ou</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Boutons sociaux */}
        <div className="flex flex-col justify-between gap-4">
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

      {/* Colonne droite : image */}
      <div className="hidden md:flex md:w-[60%] relative rounded-lg overflow-hidden shadow-lg">
        <img
          src="/images/signup-hero.png"
          alt="Connexion Yabara"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-25" />
        <div className="absolute bottom-15 left-15 text-white drop-shadow-lg">
          <h3 className="text-4xl font-semibold">Accédez à la plateforme</h3>
          <p className="text-gray-200 text-2xl">
            Et entrez en contact avec des millions de talents
          </p>
        </div>
      </div>
    </div>
  );
}
