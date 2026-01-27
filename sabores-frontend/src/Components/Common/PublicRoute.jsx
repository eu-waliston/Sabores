import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../User/hooks/useAuth';
import { ROUTES } from '../../Routes/constants';
import LoadingSpinner from './LoadingSpinner';

const PublicRoute = ({ children, restricted = false }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Se a rota é restrita (ex: login) e o usuário está autenticado, redireciona
  if (restricted && isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default PublicRoute;