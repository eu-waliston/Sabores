import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../Routes/constants';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children, roles = [], redirectTo = ROUTES.LOGIN }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    // Redirecionar para login, mantendo a rota original para retorno
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Verificar roles se especificado
  if (roles.length > 0) {
    const hasRequiredRole = roles.some(role => user?.role === role);
    
    if (!hasRequiredRole) {
      return <Navigate to={ROUTES.HOME} replace />;
    }
  }

  return children;
};

export default PrivateRoute;