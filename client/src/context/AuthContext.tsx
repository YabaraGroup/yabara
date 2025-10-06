import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../utils/fetch';
import { infoToast } from '../utils/toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 1. Vérifie la session au chargement de l'app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // on restaure d'abord les infos locales (plus rapide)
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // puis on vérifie la session côté serveur
    authApi
      .get('/api/auth/check')
      .then(res => {
        if (res.data?.ok && res.data?.user) {
          setUser(res.data.user);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('user');
        }
      })
      .catch(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ✅ 2. Connexion : met à jour le state et localStorage
  const login = (user: any) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // ✅ 3. Déconnexion : nettoie tout + logout côté serveur
  const logout = () => {
    authApi
      .post('/api/auth/logout')
      .then(() => {
        infoToast('You have been logged out');
      })
      .catch((err: unknown) => {
        console.error('Logout failed', err);
      })
      .finally(() => {
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      });
  };

  const authValue: AuthContextType = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

// ✅ Hook custom sécurisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
