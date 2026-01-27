import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from './constants';
import PrivateLayout from '../components/layout/PrivateLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy loading das páginas privadas
const ProfilePage = lazy(() => import('../pages/profile/Profile'));
const ProfileEditPage = lazy(() => import('../pages/profile/ProfileEdit'));
const MyRecipesPage = lazy(() => import('../pages/profile/MyRecipes'));
const FavoritesPage = lazy(() => import('../pages/profile/Favorites'));
const NotificationsPage = lazy(() => import('../pages/profile/Notifications'));
const SettingsPage = lazy(() => import('../pages/profile/Settings'));
const CreateRecipePage = lazy(() => import('../pages/recipe/CreateRecipe'));
const EditRecipePage = lazy(() => import('../pages/recipe/EditRecipe'));

const PrivateRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated && !loading) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <PrivateLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Perfil */}
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/perfil/editar" element={<ProfileEditPage />} />
          
          {/* Conteúdo do usuário */}
          <Route path="/minhas-receitas" element={<MyRecipesPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/notificacoes" element={<NotificationsPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          
          {/* Criação/Edição */}
          <Route path="/receitas/nova" element={<CreateRecipePage />} />
          <Route path="/receitas/:id/editar" element={<EditRecipePage />} />
          
          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/app/perfil" replace />} />
        </Routes>
      </Suspense>
    </PrivateLayout>
  );
};

export default PrivateRoutes;