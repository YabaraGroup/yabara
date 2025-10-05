import axios, { AxiosError } from 'axios';

/* ---------------------------- 
    🔧 Configuration globale 
---------------------------- */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3310';

/**
 * Instance principale : pour les appels publics (pas besoin d'auth)
 * Ex : get('/api/job-families'), get('/api/comingsoon'), etc.
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Instance sécurisée : pour les appels nécessitant les cookies JWT
 */
export const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ⚠️ cookies inclus automatiquement
});

/* ---------------------------- 
    🚨 Gestion des erreurs 
---------------------------- */

/**
 * Transforme une erreur Axios en message lisible
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || axiosError.message || 'Erreur réseau';
  }
  return 'Erreur inconnue';
};
