import { createContext, useContext, useEffect, useReducer } from 'react';
import { authApi } from '../utils/fetch';
import { infoToast } from '../utils/toast';
import { authReducer, initialAuthState } from '../reducers/authReducer';
import type { AuthState } from '../reducers/authReducer';
import type { User } from '../types/User';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const LOCAL_STORAGE_USER_KEY = 'user';

  // ✅ Vérifie la session au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (storedUser) {
      dispatch({ type: 'CHECK_SESSION_SUCCESS', payload: JSON.parse(storedUser) });
    }

    authApi
      .get('/api/auth/check')
      .then(res => {
        if (res.data?.ok && res.data?.user) {
          dispatch({ type: 'CHECK_SESSION_SUCCESS', payload: res.data.user });
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(res.data.user));
        } else {
          dispatch({ type: 'CHECK_SESSION_FAIL' });
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      })
      .catch(() => {
        dispatch({ type: 'CHECK_SESSION_FAIL' });
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      })
      .finally(() => {
        dispatch({ type: 'STOP_LOADING' });
      });
  }, []);

  // ✅ Connexion
  const login = (user: User) => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  // ✅ Déconnexion
  const logout = async () => {
    try {
      await authApi.post('/api/auth/logout');
      infoToast('You have been logged out');
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      dispatch({ type: 'LOGOUT' });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ✅ Hook sécurisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
