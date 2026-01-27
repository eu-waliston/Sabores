import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from './constants';
import AdminLayout from '../Components/layout/AdminLayout';
import LoadingSpinner from '../Components/common/LoadingSpinner';
import NotAuthorized from '../pages/NotAuthorized';

// Lazy loading das páginas admin
const AdminDashboardPage = lazy(() => import('../pages/admin/Dashboard'));
const AdminUsersPage = lazy(() => import('../pages/admin/Users'));
const AdminRecipesPage = lazy(() => import('../pages/admin/Recipes'));
const AdminCategoriesPage = lazy(() => import('../pages/admin/Categories'));
const AdminStatsPage = lazy(() => import('../pages/admin/Stats'));

const AdminRoutes = () => {
  const { isAuthenticated, loading, user } = useAuth();

  // Verificar autenticação
  if (!isAuthenticated && !loading) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Verificar se é admin
  if (!user?.isAdmin) {
    return <NotAuthorized />;
  }

  return (
    <AdminLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<AdminDashboardPage />} />
          <Route path="/usuarios" element={<AdminUsersPage />} />
          <Route path="/receitas" element={<AdminRecipesPage />} />
          <Route path="/categorias" element={<AdminCategoriesPage />} />
          <Route path="/estatisticas" element={<AdminStatsPage />} />
          
          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </AdminLayout>
  );
};

export default AdminRoutes;