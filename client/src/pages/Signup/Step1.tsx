import { useStep } from '../../context/StepContext';
import Field from '../../components/Field';
import { errorToast } from '../../utils/toast';

export default function Step1() {
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
    // toutes les validations sont passées
    return true;
  };

  const { user, setUser, nextStep } = useStep();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // check validations
    if (!checkValidations()) return;

    nextStep(); // passe à l'étape 2
  };

  return (
    <form className="max-w-md mx-auto space-y-4" onSubmit={onSubmit}>
      <Field label="Nom" name="lastname" value={user.lastname} onChange={onChange} required />
      <Field label="Prénom" name="firstname" value={user.firstname} onChange={onChange} required />
      <Field
        label="Email"
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
      <div className="flex justify-end">
        <button type="submit" className="bg-gold hover:bg-dark-gold text-white px-4 py-2 rounded">
          Continuer l’inscription
        </button>
      </div>
    </form>
  );
}
