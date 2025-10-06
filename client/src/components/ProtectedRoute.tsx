// components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // ⏳ Tant que la vérification du token n’est pas terminée
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // 🚫 Si l’utilisateur n’est pas connecté après le chargement
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Sinon, on rend les routes enfants
  return <Outlet />;
};

export default ProtectedRoute;
