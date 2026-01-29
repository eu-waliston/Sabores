import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../Components/Common/PrivateRoute';
import PublicRoute from '../Components/Common/PublicRoute';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import { ROUTES } from './constants';

// Layout
const MainLayout = lazy(() => import('../MainLayout'));

// Páginas Públicas
const Home = lazy(() => import('../Pages/Home'));
const Feed = lazy(() => import('../Components/Feed/Feed'));
const NotFound = lazy(() => import('../Pages/NotFoundPage'));

// Auth
const Login = lazy(() => import('../Components/User/auth/Login'));
const Register = lazy(() => import('../Components/User/auth/Register'));
const Recovery = lazy(() => import('../Components/User/auth/Recovery'));
const ResetPassword = lazy(() => import('../Components/User/auth/ResetPassword'));
const VerifyEmail = lazy(() => import('../Components/User/auth/VerifyEmail'));

// Usuário (Protegidas)
const MyRecipes = lazy(() => import('../Components/Feed/Feed'));
const CreateRecipe = lazy(() => import('../Pages/FeaturesSection'));
const RecipeDetail = lazy(() => import('../Pages/FeaturesSection'));

// Categorias
const Categories = lazy(() => import('../Pages/StatsSection'));
const CategoryDetail = lazy(() => import('../Pages/HomeWrapper'));

// Outras
const Search = lazy(() => import('../Pages/FeaturesSection'));

// Erros
const ServerError = lazy(() => import('../Pages/ServerError'));
const Maintenance = lazy(() => import('../Pages/Error/Maintenance'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Carregando..." />}>
      <Routes>

        {/* ===================== */}
        {/* ROTAS COM LAYOUT */}
        {/* ===================== */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.FEED} element={<Feed />} />

          {/* Receitas */}
          <Route path={ROUTES.RECIPES} element={<div>Lista de Receitas</div>} />
          <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetail />} />

          {/* Categorias */}
          <Route path={ROUTES.CATEGORIES} element={<Categories />} />
          <Route path={ROUTES.CATEGORY_DETAIL} element={<CategoryDetail />} />

          {/* Busca */}
          <Route path={ROUTES.SEARCH} element={<Search />} />

          {/* Erros */}
          <Route path="/500" element={<ServerError />} />
          <Route path="/maintenance" element={<Maintenance />} />
        </Route>

        {/* ===================== */}
        {/* ROTAS DE AUTENTICAÇÃO */}
        {/* (SEM MENU) */}
        {/* ===================== */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute restricted>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.REGISTER}
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.RECOVERY}
          element={
            <PublicRoute>
              <Recovery />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <PublicRoute restricted>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route
          path={ROUTES.VERIFY_EMAIL}
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />

        {/* ===================== */}
        {/* TERMOS / POLÍTICAS */}
        {/* (SEM MENU) */}
        {/* ===================== */}
        <Route path="/termos" element={<div>Termos de Serviço</div>} />
        <Route path="/privacidade" element={<div>Política de Privacidade</div>} />
        <Route path="/cookies" element={<div>Política de Cookies</div>} />

        {/* ===================== */}
        {/* ROTAS PROTEGIDAS */}
        {/* ===================== */}
        <Route
          path={ROUTES.MY_RECIPES}
          element={
            <PrivateRoute>
              <MyRecipes />
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.CREATE_RECIPE}
          element={
            <PrivateRoute>
              <CreateRecipe />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute roles={['admin']}>
              <div>Admin Dashboard</div>
            </PrivateRoute>
          }
        />

        {/* Redirect */}
        <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
