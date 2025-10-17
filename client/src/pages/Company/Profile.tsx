import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Field from '../../components/Field';
import { authApi } from '../../utils/fetch';
import { errorToast, successToast } from '../../utils/toast';

export default function Profile() {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    authApi.post('/api/auth/update-company-contact', formData).then(res => {
      if (res.data?.ok && res.data?.user) {
        setFormData(res.data.user);
        login(res.data.user);
        successToast('Profil mis à jour avec succès !');
      } else {
        errorToast('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    });
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 italic">Chargement du profil...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto rounded-2xl shadow-lg p-8 mt-10 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-200">
          {formData.firstname} {formData.lastname}
        </h2>
        <p className="text-gray-100 text-sm">{formData.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="Prénom"
          name="firstname"
          value={formData.firstname || ''}
          onChange={handleChange}
          required
        />
        <Field
          label="Nom"
          name="lastname"
          value={formData.lastname || ''}
          onChange={handleChange}
          required
        />
        <div className="md:col-span-2">
          <Field
            label="Email"
            name="email"
            type="email"
            disabled
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-gold text-white px-6 py-2 rounded-lg hover:bg-dark-gold transition-all duration-200 shadow-md"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
