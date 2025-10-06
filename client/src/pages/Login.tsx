import { useState } from 'react';
import { successToast, errorToast } from '../utils/toast';
import { authApi } from '../utils/fetch';
import Field from '../components/Field';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface User {
  email: string;
  password: string;
}

function Login() {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const { login } = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authApi
      .post('/api/auth/login', user)
      .then(data => {
        successToast(`Welcome back, ${data.data.user.firstname}!`);
        login(data.data.user);
        nav('/app');
      })
      .catch(error => {
        errorToast(error.response?.data?.message || 'Login failed');
      });
  };

  return (
    <section>
      <h1>Page de connexion</h1>
      <form onSubmit={handleSubmit}>
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
        <div className="flex justify-end">
          <button type="submit" className="bg-gold hover:bg-dark-gold text-white px-4 py-2 rounded">
            Connexion
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
