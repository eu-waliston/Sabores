import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './constants';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';
import AuthRoutes from './AuthRoutes';
import ErrorPage from '../pages/ErrorPage';
import NotFoundPage from '../pages/NotFoundPage';
import MaintenancePage from '../pages/MaintenancePage';

const AppRoutes = () => {
  // Verificar se está em manutenção (pode vir de variável de ambiente)
  const isMaintenance = process.env.REACT_APP_MAINTENANCE === 'true';

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <Routes>
      {/* Redirecionamento padrão */}
      <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
      
      {/* Rotas públicas */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Rotas de autenticação */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      
      {/* Rotas privadas (usuário logado) */}
      <Route path="/app/*" element={<PrivateRoutes />} />
      
      {/* Rotas admin */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Rotas de erro */}
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;