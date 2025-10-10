import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/fetch';
import { useStep } from '../../context/StepContext';
import Field from '../../components/Field';
import { avatarsMan, avatarsWoman } from '../../utils/imgAvatar';
import AvatarCarousel from '../../components/AvatarCarousel';

export default function Step2() {
  const [jobFamilies, setJobFamilies] = useState([]);
  const [companySectors, setCompanySectors] = useState([]);

  useEffect(() => {
    let endpoints = ['/api/job-families', '/api/company-sectors'];

    Promise.all(endpoints.map(endpoint => api.get(endpoint))).then(
      ([jobFamiliesRes, companySectorsRes]) => {
        setJobFamilies(jobFamiliesRes.data.jobFamilies);
        setCompanySectors(companySectorsRes.data.companySectors);
      },
    );
  }, []);
  const { accountType } = useStep();
  return accountType === 'user' ? (
    <Step2User jobFamilies={jobFamilies} />
  ) : (
    <Step2Company companySectors={companySectors} />
  );
}

/* ------- Étape 2 : USER ------- */
function Step2User({ jobFamilies }: { jobFamilies: { id: number; name: string }[] }) {
  const navigate = useNavigate();

  const { profile, setProfile, prevStep, handleSubmit } = useStep();
  const [gender, setGender] = useState<'woman' | 'man'>('woman'); // toggle

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectAvatar = (url: string) => {
    setProfile(prev => ({ ...prev, avatar_url: url }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) navigate('/login');
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
      <AvatarCarousel
        avatars={gender === 'woman' ? avatarsWoman : avatarsMan}
        handleSelectAvatar={handleSelectAvatar}
      />

      <div className="flex justify-between gap-4">
        <Field
          label="Téléphone"
          name="phone"
          value={profile.phone ?? ''}
          onChange={onChange}
          required
        />
        <Field
          label="Parrainage"
          name="referral"
          value={profile.referral ?? ''}
          onChange={onChange}
        />
      </div>

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
function Step2Company({ companySectors }: { companySectors: { id: number; name: string }[] }) {
  const navigate = useNavigate();

  const { company, setCompany, prevStep, handleSubmit } = useStep();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) navigate('/login');
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
      <div className="flex justify-between gap-4">
        <Field
          label="Nom de la société"
          name="name"
          value={company.name}
          onChange={onChange}
          required
        />
        <Field
          label="Année de création"
          name="creationYear"
          value={company.creationYear ?? ''}
          onChange={onChange}
        />
      </div>
      <Field
        label="Pôle d’activité"
        name="pole"
        type="select"
        options={companySectors.map((cs: any) => ({ value: cs.id, label: cs.name }))}
        value={company.pole}
        onChange={onChange}
        required
      />

      <Field
        label="Numéro SIREN / SIRET"
        name="siret"
        value={company.siret}
        onChange={onChange}
        required
      />

      <Field label="Adresse" name="address" value={company.address ?? ''} onChange={onChange} />
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
