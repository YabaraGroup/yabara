import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { successToast, errorToast } from '../utils/toast';
import { authApi } from '../utils/fetch';
import { useAuth } from '../context/AuthContext';
import Field from '../components/Field';

interface User {
  email: string;
  password: string;
}

function Login() {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const { login } = useAuth();
  const nav = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authApi
      .post('/api/auth/login', user)
      .then(data => {
        successToast(`Welcome back, ${data.data.user.firstname}!`);
        login(data.data.user);

        switch (data.data.user.account_type) {
          case 'talent':
            nav(`/app/profile/talent`);
            break;
          case 'admin':
            nav('/app/admin/dashboard');
            break;
          case 'company':
            nav(`/app/company/dashboard/${data.data.user.id_company}`);
            break;

          default:
            nav(`/app/`);
            break;
        }
      })
      .catch(error => {
        errorToast(error.response?.data?.message || 'Login failed');
      });
  };

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

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Field
            label="Adresse e-mail"
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

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Continuer
          </button>
        </form>

        {/* Séparateur */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-4 text-gray-500 text-sm">ou</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Boutons sociaux */}
        <div className="space-y-3">
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

export default Login;
