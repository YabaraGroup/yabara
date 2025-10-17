import { createContext, useContext, useState } from 'react';
import { api } from '../utils/fetch';
import { toastPromise, errorToast } from '../utils/toast';

// ---- Types ----
interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Profile {
  phone?: string;
  education_level?: string;
  avatar_url?: string;
  id_job_family: number;
  referral?: string;
}

interface Company {
  name: string;
  pole: string;
  siret: string;
  creationYear?: string;
  address?: string;
  website?: string;
}

interface StepContextType {
  step: number;
  accountType: 'user' | 'company';
  setAccountType: (type: 'user' | 'company') => void;

  nextStep: () => void;
  prevStep: () => void;

  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;

  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;

  company: Company;
  setCompany: React.Dispatch<React.SetStateAction<Company>>;

  handleSubmit: () => boolean | Promise<boolean>;

  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function createIdentifier(phoneNumber: string, firstname: string, lastname: string): string {
  /**
   * Pour créer l'identifiant unique, je vais prendre
   * - les deux dernieres lettre du prénom, ensuite
   * - la deuxieme série du numéro de téléphone, ensuite
   * - les deux premières lettres du nom de famille pour finir avec
   * - la quatrième série du numéro de téléphone.
   */

  const cleanPhone = phoneNumber.replace(/\s+/g, ''); // enlève tous les espaces si présent

  const idPart1 = firstname.slice(-2);
  const idPart2 = cleanPhone.slice(2, 4);
  const idPart3 = lastname.slice(0, 2);
  const idPart4 = cleanPhone.slice(6, 8);
  return idPart1 + idPart2 + idPart3 + idPart4;
}

// ---- Valeurs initiales ----
const initialUser: User = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialProfile: Profile = {
  phone: '',
  education_level: '',
  avatar_url: '',
  id_job_family: 0,
  referral: '',
};

const initialCompany: Company = {
  name: '',
  pole: '',
  siret: '',
  creationYear: '',
  address: '',
  website: '',
};

// ---- Context ----
const StepContext = createContext<StepContextType | undefined>(undefined);

export function StepProvider({ children }: { children: React.ReactNode }) {
  function removeEmptyFields<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== '' && v !== null && v !== undefined),
    ) as Partial<T>;
  }
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'user' | 'company'>('user');

  const [user, setUser] = useState<User>(initialUser);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [company, setCompany] = useState<Company>(initialCompany);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    let payload: any = {};

    if (user.password !== user.confirmPassword) {
      errorToast('❌ Les mots de passe ne correspondent pas.');
      return false;
    }

    // création de l'idUnique
    const idUnique = createIdentifier(
      profile.phone ?? '',
      user.firstname,
      user.lastname,
    ).toUpperCase();

    // Nettoyage des objets pour enlever les champs vides
    const cleanedUser = removeEmptyFields(user);
    const cleanedProfile = removeEmptyFields(profile);
    const cleanedCompany = removeEmptyFields(company);

    payload = {
      ...cleanedUser,
      ...cleanedProfile,
      ...cleanedCompany,
      idUnique,
      id_job_family: profile.id_job_family ? +profile.id_job_family : undefined,
    };

    const signupPromise = api.post(`/api/auth/signup/${accountType}`, payload);

    toastPromise(signupPromise, {
      pending: '⏳ Création du compte...',
      success: '✅ Inscription réussie !',
      error: err =>
        err?.response?.data?.message || "❌ Une erreur est survenue lors de l'inscription.",
    });

    await signupPromise;
    setUser(initialUser);
    setProfile(initialProfile);
    setCompany(initialCompany);
    setStep(1);

    // redirection vers la page de login
    return true;
  };

  const value: StepContextType = {
    step,
    accountType,
    setAccountType,
    nextStep,
    prevStep,
    user,
    setUser,
    profile,
    setProfile,
    company,
    setCompany,
    handleSubmit,
    setStep,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}

export const useStep = () => {
  const context = useContext(StepContext);
  if (context === undefined) {
    throw new Error('useStep must be used within a StepProvider');
  }
  return context;
};
