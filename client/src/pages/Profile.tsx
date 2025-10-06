import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Field from '../components/Field';
import { authApi } from '../utils/fetch';
import { successToast } from '../utils/toast';

export default function Profile() {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState(user);

  // 🧠 On s’assure de bien synchroniser quand user est dispo
  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authApi.post('/api/auth/update-user', formData).then(res => {
      if (res.data?.ok && res.data?.user) {
        setFormData(res.data.user);
        login(res.data.user); // Met à jour le contexte Auth
        successToast('Profil mis à jour avec succès !');
      } else {
        // Gérer les erreurs si nécessaire
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
    <div className="max-w-4xl mx-auto rounded-2xl shadow-lg p-8 mt-10 border border-gray-100">
      {/* HEADER */}
      <div className="flex items-center mb-8">
        <img
          src={formData.avatar_url}
          alt={`${formData.firstname} ${formData.lastname}`}
          className="w-24 h-24 rounded-full object-cover border-4 border-gold shadow-md"
        />
        <div className="ml-6">
          <h2 className="text-2xl font-semibold text-gray-200">
            {formData.firstname} {formData.lastname}
          </h2>
          <p className="text-gray-100 text-sm">Identifiant : {formData.identification}</p>
        </div>
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
        <Field
          label="Email"
          name="email"
          type="email"
          disabled
          value={formData.email || ''}
          onChange={handleChange}
          required
        />
        <Field
          label="Téléphone"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
        />
        <Field
          label="Niveau d'éducation"
          name="education_level"
          type="select"
          value={formData.education_level || ''}
          onChange={handleChange}
          options={[
            { value: 'none', label: 'Aucun' },
            { value: 'high_school', label: 'Baccalauréat' },
            { value: 'bachelor', label: 'Licence' },
            { value: 'master', label: 'Master' },
            { value: 'doctorate', label: 'Doctorat' },
          ]}
        />
        <Field
          label="Lien de parrainage"
          name="referral_link"
          value={formData.referral_link ?? ''}
          onChange={handleChange}
        />

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
