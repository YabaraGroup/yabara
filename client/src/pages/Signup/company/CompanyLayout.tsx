import { useState, useEffect } from 'react';
import { BsMegaphone } from 'react-icons/bs';
import { LuUserRoundSearch } from 'react-icons/lu';
import { GoGift } from 'react-icons/go';
import { useStep } from '../../../context/StepContext';
import ButtonType from '../../../components/Button';
import Field from '../../../components/Field';
import {
  UserRound,
  Building2,
  Briefcase,
  MapPin,
  ClipboardList,
  HandCoins,
  AlignLeft,
  Pencil,
} from 'lucide-react';
import { api } from '../../../utils/fetch';
import { errorToast } from '../../../utils/toast';

export default function CompanyLayout() {
  const { step, nextStep, prevStep, user, setStep } = useStep();

  const [pole, setPole] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    // 👤 Étape 1 : Utilisateur
    lastname: '',
    firstname: '',
    phone: '',

    // 🏢 Étape 2 : Entreprise
    companyName: '',
    rccm: '',
    activitySector: '',
    activityName: '',

    // 💼 Étape 3 à 6 : Offre
    jobTitle: '',
    jobLocation: '',
    contractType: '', // ex: CDI, CDD, Stage...
    jobTime: '', // ex: Temps plein / Temps partiel
    duration: '',
    durationUnit: '', // jours, mois, ans
    salaryMin: '',
    salaryMax: '',
    salaryUnit: '', // mois, an
    description: '',
  });

  useEffect(() => {
    api.get('api/company-sectors').then(response => {
      setPole(response.data.companySectors);
    });
    setStep(1);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelect = (field: 'jobTime' | 'contractType', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post('api/auth/signup/company', { ...user, ...formData })
      .then(response => {
        if (response.data.ok) {
          // rediriger vers la page de connexion
          window.location.href = '/login';
        }
      })
      .catch(err => {
        console.error(err);
        errorToast('Une erreur est survenue. Veuillez réessayer.');
      });
  };

  const liItems = [
    {
      icon: <BsMegaphone className="text-gold text-xl" />,
      title: 'Diffusez vos offres',
      text: 'Texte',
    },
    {
      icon: <LuUserRoundSearch className="text-gold text-xl" />,
      title: 'Trouvez vos talents',
      text: 'Texte',
    },
    {
      icon: <GoGift className="text-gold text-xl" />,
      title: 'Gagnez des récompenses',
      text: 'Texte',
    },
  ];

  const SummaryItem = ({
    icon,
    title,
    subtitle,
  }: {
    icon: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
  }) => (
    <div className="flex items-start justify-between gap-4 bg-white p-2">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
          {icon}
        </div>
        <div>
          <p className="text-gray-800 font-medium">{title}</p>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Bouton édition */}
      <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition">
        <Pencil className="w-4 h-4 text-[#497099]" />
      </button>
    </div>
  );

  // 🧩 Toutes les étapes ici
  const steps = [
    {
      title: 'Vous concernant :',
      subtitle: 'Veuillez remplir les champs suivants',
      content: (
        <>
          <div className="flex gap-4">
            <Field label="Nom" name="lastname" value={formData.lastname} onChange={handleChange} />
            <Field
              label="Prénom"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <Field
            label="Numéro de téléphone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </>
      ),
    },
    {
      title: 'Concernant votre entreprise :',
      subtitle: 'Veuillez remplir les champs suivants',
      content: (
        <>
          <Field
            label="Nom de l’entreprise"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          <Field
            label="Numéro RCCM"
            name="rccm"
            type="number"
            value={formData.rccm}
            onChange={handleChange}
          />
          <Field
            label="Pôle d’activité"
            name="activitySector"
            type="select"
            options={pole.map((sector: { id: string; name: string }) => ({
              value: sector.id,
              label: sector.name,
            }))}
            value={formData.activitySector}
            onChange={e => {
              const selectedId = e.target.value;
              const selected = pole.find((s: any) => s.id === parseInt(selectedId));
              setFormData(prev => ({
                ...prev,
                activitySector: selectedId,
                activityName: selected ? selected.name : '',
              }));
            }}
          />
        </>
      ),
    },
    {
      title: 'Concernant le poste à pourvoir :',
      subtitle: 'Veuillez remplir les champs suivants',
      content: (
        <>
          <Field
            label="Intitulé du poste"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
          <Field
            label="Localisation du poste"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
          />
        </>
      ),
    },
    {
      title: 'Concernant le poste à pourvoir :',
      subtitle: 'Veuillez remplir les champs suivants',
      content: (
        <>
          {/* Temps plein / partiel */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            <ButtonType
              text="Temps plein"
              variant={formData.jobTime === 'fullTime' ? 'primary' : 'secondary'}
              onClick={() => handleSelect('jobTime', 'fullTime')}
            />
            <ButtonType
              text="Temps partiel"
              variant={formData.jobTime === 'partTime' ? 'primary' : 'secondary'}
              onClick={() => handleSelect('jobTime', 'partTime')}
            />
          </div>

          {/* Types de contrat */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            {/* si  formData.jobTime === 'fullTime' alors affiche TOUT sinon affiche CDI CDD ALTERNANCE*/}
            {formData.jobTime === 'fullTime'
              ? ['CDI', 'CDD', 'Alternance', 'Stage', 'Freelance'].map(type => (
                  <ButtonType
                    key={type}
                    text={type}
                    variant={formData.contractType === type ? 'primary' : 'secondary'}
                    onClick={() => handleSelect('contractType', type)}
                  />
                ))
              : formData.jobTime === 'partTime'
                ? ['CDI', 'CDD', 'Alternance'].map(type => (
                    <ButtonType
                      key={type}
                      text={type}
                      variant={formData.contractType === type ? 'primary' : 'secondary'}
                      onClick={() => handleSelect('contractType', type)}
                    />
                  ))
                : null}
          </div>

          {/* Durée */}
          {/* Si le champ de contrat est égal à CDI ou rien alors, on affiche pas le champ de durée */}
          {formData.contractType && formData.contractType !== 'CDI' && (
            <div className="flex gap-2 items-center mt-4">
              <span>Durée</span>
              <Field
                label="Durée du contrat"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
              />
              {formData.contractType === 'Freelance' ? (
                <Field
                  type="select"
                  options={[
                    { value: 'jours', label: 'Jours' },
                    { value: 'mois', label: 'Mois' },
                  ]}
                  label="&nbsp;"
                  name="durationUnit"
                  value={formData.durationUnit}
                  onChange={handleChange}
                />
              ) : (
                <Field
                  type="select"
                  options={[
                    { value: 'mois', label: 'Mois' },
                    { value: 'ans', label: 'Ans' },
                  ]}
                  label="&nbsp;"
                  name="durationUnit"
                  value={formData.durationUnit}
                  onChange={handleChange}
                />
              )}
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Concernant le poste à pourvoir :',
      subtitle: 'Veuillez remplir les champs suivants',
      content: (
        <div className="flex gap-2 flex-col">
          <span>Rémunération estimée</span>
          <div className="flex gap-2 items-center">
            <span>De</span>
            <Field
              label="Minimum"
              name="salaryMin"
              type="number"
              value={formData.salaryMin}
              onChange={handleChange}
            />
            <span>à</span>
            <Field
              label="Maximum"
              name="salaryMax"
              type="number"
              value={formData.salaryMax}
              onChange={handleChange}
            />
            <Field
              type="select"
              options={[
                { value: 'mois', label: 'Par mois' },
                { value: 'an', label: 'Par an' },
              ]}
              label="&nbsp;"
              name="salaryUnit"
              value={formData.salaryUnit}
              onChange={handleChange}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Concernant le poste à pourvoir :',
      subtitle: 'Veuillez remplir les champs suivants',
      content: (
        <>
          <Field
            label="Description du poste"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            required
            rows={8}
          />

          <ButtonType text="Générer une description" />
        </>
      ),
    },
    {
      title: 'Résumé de votre offre :',
      subtitle: 'Veuillez vérifier les informations suivantes',
      content: (
        <div className="space-y-4">
          {/* Utilisateur */}
          <SummaryItem
            icon={<UserRound className="text-[#5481AA]" />}
            title={`${formData.firstname} ${formData.lastname}`}
            subtitle={formData.phone || '—'}
          />

          {/* Entreprise */}
          <SummaryItem
            icon={<Building2 className="text-[#5481AA]" />}
            title={formData.companyName || '—'}
            subtitle={`${formData.rccm || '—'} / ${formData.activityName || '—'}`}
          />

          {/* Poste */}
          <SummaryItem
            icon={<Briefcase className="text-[#5481AA]" />}
            title="Intitulé du poste"
            subtitle={formData.jobTitle || '—'}
          />

          {/* Localisation */}
          <SummaryItem
            icon={<MapPin className="text-[#5481AA]" />}
            title="Localisation"
            subtitle={formData.jobLocation || '—'}
          />

          {/* Type de contrat */}
          <SummaryItem
            icon={<ClipboardList className="text-[#5481AA]" />}
            title="Type de contrat"
            subtitle={`${formData.jobTime || '—'}, ${formData.contractType || '—'}${
              formData.duration ? `, ${formData.duration} ${formData.durationUnit}` : ''
            }`}
          />

          {/* Rémunération */}
          <SummaryItem
            icon={<HandCoins className="text-[#5481AA]" />}
            title="Rémunération"
            subtitle={`Entre ${formData.salaryMin || '—'} et ${formData.salaryMax || '—'} ${
              formData.salaryUnit === 'an' ? 'euros/an' : 'euros/mois'
            }`}
          />

          {/* Description */}
          <SummaryItem
            icon={<AlignLeft className="text-[#5481AA]" />}
            title="Description"
            subtitle={
              formData.description ? (
                <span className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline">
                  Voir la description
                </span>
              ) : (
                '—'
              )
            }
          />
        </div>
      ),
    },
  ];

  const currentStep = steps[step - 1]; // -1 car step car on commence à 1

  return (
    <div className="flex h-screen bg-[#f4f8fb]">
      {/* Colonne gauche */}
      <div className="w-[30%] bg-gradient-to-br from-[#314466] to-[#449DD1] text-white p-10 flex flex-col justify-between m-5 rounded-xl shadow-xl">
        <div>
          <img src="/logo.png" alt="Yabara Logo" className="h-8 mb-8" />
          <h2 className="text-3xl font-semibold mb-2">Accédez à la plateforme</h2>
          <p className="text-[#9FC4DA] mb-12">Entrez en contact avec des millions de talents</p>

          <ul className="space-y-6 text-gray-200">
            {liItems.map((item, index) => (
              <li key={index}>
                <div className="flex flex-col items-start gap-3 py-5 rounded-xl text-white w-64">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/20">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold py-2">{item.title}</h3>
                    <p className="text-[#9FC4DA] text-sm font-extralight">{item.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Colonne droite */}
      <div className="flex-1 flex justify-center items-center bg-white rounded-l-2xl shadow-xl p-12 overflow-y-auto m-5 rounded-xl">
        <div className="w-full max-w-2xl">
          <div className="w-full bg-gray-200 rounded h-3 mb-10">
            <div
              className="bg-[#6D9CC0] h-3 rounded transition-all duration-500"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
          <div className="mb-8">
            <h2 className="text-2xl mb-2">{currentStep.title}</h2>
            <p className="text-xl text-gray-600">{currentStep.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/** Affichage des étapes ici */}
            <div className="flex flex-col gap-4">{currentStep.content}</div>
            <div className="flex justify-between mt-8 gap-3">
              <div className="flex gap-3">
                <ButtonType text="Annuler" variant="secondary" />

                {step >= 2 && (
                  <ButtonType text="Précédent" variant="secondary" onClick={prevStep} />
                )}
              </div>

              {step < steps.length ? (
                <ButtonType
                  text={step === steps.length - 1 ? 'Récapitulatif' : 'Continuer'}
                  variant="primary"
                  onClick={nextStep}
                />
              ) : (
                <ButtonType text="Confirmer l'envoi" variant="primary" onClick={handleSubmit} />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
