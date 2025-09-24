import { useEffect, useState } from 'react';
import api from '../../utils/fetch';
import { useStep } from '../../context/StepContext';
import Field from '../../components/Field';
import { avatarsMan, avatarsWoman } from '../../utils/imgAvatar';

export default function Step2() {
  const [jobFamilies, setJobFamilies] = useState([]);

  useEffect(() => {
    api.get('/api/job-families').then(res => {
      setJobFamilies(res.data.jobFamilies);
    });
  }, []);
  const { accountType } = useStep();
  return accountType === 'user' ? <Step2User jobFamilies={jobFamilies} /> : <Step2Company />;
}

/* ------- Étape 2 : USER ------- */
function Step2User({ jobFamilies }: { jobFamilies: { id: number; name: string }[] }) {
  const { profile, setProfile, prevStep, handleSubmit } = useStep();
  const [gender, setGender] = useState<'woman' | 'man'>('woman'); // toggle

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectAvatar = (url: string) => {
    setProfile(prev => ({ ...prev, avatar_url: url }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
      {/* Toggle */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          type="button"
          onClick={() => setGender('woman')}
          className={`px-4 py-2 rounded ${
            gender === 'woman' ? 'bg-gold text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Femmes
        </button>
        <button
          type="button"
          onClick={() => setGender('man')}
          className={`px-4 py-2 rounded ${
            gender === 'man' ? 'bg-gold text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Hommes
        </button>
      </div>

      {/* Sélecteur d’avatars */}
      <div className="grid grid-cols-5 gap-2">
        {(gender === 'woman' ? avatarsWoman : avatarsMan).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`avatar ${gender} ${i + 1}`}
            onClick={() => handleSelectAvatar(src)}
            className={`cursor-pointer rounded border-2 ${
              profile.avatar_url === src ? 'border-gold' : 'border-transparent'
            }`}
          />
        ))}
      </div>

      {/* Aperçu de l’avatar choisi */}
      {profile.avatar_url && (
        <div className="flex items-center gap-2">
          <span className="block mb-1 font-medium">Avatar sélectionné :</span>
          <img
            src={profile.avatar_url}
            alt="Avatar sélectionné"
            className="w-32 h-32 rounded border border-gray-300"
          />
        </div>
      )}

      <Field label="Téléphone" name="phone" value={profile.phone ?? ''} onChange={onChange} />

      <Field
        label="Niveau d'études"
        name="education_level"
        value={profile.education_level ?? ''}
        onChange={onChange}
        type="select"
        options={[
          { value: 'none', label: 'Aucun' },
          { value: 'high_school', label: 'Baccalauréat' },
          { value: 'bachelor', label: 'Licence' },
          { value: 'master', label: 'Master' },
          { value: 'doctorate', label: 'Doctorat' },
        ]}
        required
      />

      <Field
        label="Famille de métier"
        name="id_job_family"
        value={profile.id_job_family !== undefined ? String(profile.id_job_family) : ''}
        type="select"
        options={jobFamilies.map((jf: any) => ({ value: jf.id, label: jf.name }))}
        required
        onChange={onChange}
      />

      <Field
        label="Parrainage"
        name="referral"
        value={profile.referral ?? ''}
        onChange={onChange}
      />

      <div className="flex justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Retour
        </button>
        <button type="submit" className="bg-gold hover:bg-dark-gold text-white px-4 py-2 rounded">
          Finaliser
        </button>
      </div>
    </form>
  );
}

/* ------- Étape 2 : COMPANY ------- */
function Step2Company() {
  const { company, setCompany, prevStep, handleSubmit } = useStep();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(); // envoie { ...company }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
      <Field label="Pôle d’activité" name="pole" value={company.pole} onChange={onChange} />
      <Field
        label="Famille de métier"
        name="jobFamily"
        value={company.jobFamily}
        onChange={onChange}
      />
      <Field label="Numéro SIREN / SIRET" name="siret" value={company.siret} onChange={onChange} />
      <Field
        label="Année de création"
        name="creationYear"
        value={company.creationYear}
        onChange={onChange}
      />
      <Field label="Adresse" name="address" value={company.address} onChange={onChange} />
      <Field
        label="Site web / réseau"
        name="website"
        value={company.website ?? ''}
        onChange={onChange}
      />

      <div className="flex justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Retour
        </button>
        <button type="submit" className="bg-gold hover:bg-dark-gold text-white px-4 py-2 rounded">
          Finaliser
        </button>
      </div>
    </form>
  );
}
