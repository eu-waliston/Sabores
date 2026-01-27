import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy loading das páginas públicas
const HomePage = lazy(() => import('../pages/Home/Home'));
const RecipesPage = lazy(() => import('../pages/Recipes/Recipes'));
const RecipeDetailPage = lazy(() => import('../pages/RecipeDetail/RecipeDetail'));
const CategoriesPage = lazy(() => import('../pages/Categories/Categories'));
const CategoryDetailPage = lazy(() => import('../pages/CategoryDetail/CategoryDetail'));
const SearchPage = lazy(() => import('../pages/Search/Search'));
const AboutPage = lazy(() => import('../pages/About/About'));
const ContactPage = lazy(() => import('../pages/Contact/Contact'));
const BlogPage = lazy(() => import('../pages/Blog/Blog'));
const FAQPage = lazy(() => import('../pages/FAQ/FAQ'));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* Home */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        
        {/* Receitas */}
        <Route path={ROUTES.RECIPES} element={<RecipesPage />} />
        <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetailPage />} />
        
        {/* Categorias */}
        <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
        <Route path={ROUTES.CATEGORY_DETAIL} element={<CategoryDetailPage />} />
        
        {/* Busca */}
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        
        {/* Informações */}
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.BLOG} element={<BlogPage />} />
        <Route path={ROUTES.FAQ} element={<FAQPage />} />
        
        {/* Termos e Políticas */}
        <Route path="/termos" element={<div>Termos de Serviço</div>} />
        <Route path="/privacidade" element={<div>Política de Privacidade</div>} />
        <Route path="/cookies" element={<div>Política de Cookies</div>} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;