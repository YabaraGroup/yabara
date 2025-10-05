import { createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Ici, vous pouvez ajouter des états et des fonctions liés à l'authentification
  const authValue: AuthContextType = {
    isAuthenticated: false,
    user: null,
    login: (email: string, password: string) => {},
    logout: () => {},
  };
  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
