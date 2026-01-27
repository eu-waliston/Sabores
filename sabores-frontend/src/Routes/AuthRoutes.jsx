import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from './constants';
import AuthLayout from '../components/auth/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy loading das páginas de autenticação
const LoginPage = lazy(() => import('../pages/auth/Login'));
const RegisterPage = lazy(() => import('../pages/auth/Register'));
const RecoveryPage = lazy(() => import('../pages/auth/Recovery'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPassword'));
const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmail'));

const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();

  // Se já estiver autenticado, redireciona para home
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <AuthLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
          <Route path="/recuperar-senha" element={<RecoveryPage />} />
          <Route path="/resetar-senha/:token" element={<ResetPasswordPage />} />
          <Route path="/verificar-email/:token" element={<VerifyEmailPage />} />
          
          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Suspense>
    </AuthLayout>
  );
};

export default AuthRoutes;