import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './components/user/hooks/useAuth';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import { ROUTES } from './routes/constants';

// Layouts
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const AuthLayout = lazy(() => import('./components/user/layout/AuthLayout'));

// Pages - Lazy loading
const HomePage = lazy(() => import('./pages/Home'));
const RecipesPage = lazy(() => import('./pages/Recipes/Recipes'));
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetail/RecipeDetail'));
const CategoriesPage = lazy(() => import('./pages/Categories/Categories'));
const CategoryDetailPage = lazy(() => import('./pages/CategoryDetail/CategoryDetail'));
const SearchPage = lazy(() => import('./pages/Search/Search'));
const AboutPage = lazy(() => import('./pages/About/About'));
const ContactPage = lazy(() => import('./pages/Contact/Contact'));
const BlogPage = lazy(() => import('./pages/Blog/Blog'));
const FAQPage = lazy(() => import('./pages/FAQ/FAQ'));

// Auth Pages
const LoginPage = lazy(() => import('./components/user/auth/Login'));
const RegisterPage = lazy(() => import('./components/user/auth/Register'));
const RecoveryPage = lazy(() => import('./components/user/auth/Recovery'));
const ResetPasswordPage = lazy(() => import('./components/user/auth/ResetPassword'));
const VerifyEmailPage = lazy(() => import('./components/user/auth/VerifyEmail'));

// User Pages
const ProfilePage = lazy(() => import('./pages/User/Profile'));
const MyRecipesPage = lazy(() => import('./pages/User/MyRecipes'));
const FavoritesPage = lazy(() => import('./pages/User/Favorites'));
const SettingsPage = lazy(() => import('./pages/User/Settings'));
const CreateRecipePage = lazy(() => import('./pages/Recipe/CreateRecipe'));
const EditRecipePage = lazy(() => import('./pages/Recipe/EditRecipe'));

// Error Pages
const NotFoundPage = lazy(() => import('./pages/Error/NotFound'));
const ServerErrorPage = lazy(() => import('./pages/Error/ServerError'));
const MaintenancePage = lazy(() => import('./pages/Error/Maintenance'));

// Admin Pages (se necessário)
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));

const App = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner fullScreen text="Carregando..." />}>
              <Routes>
                {/* Public Routes with Main Layout */}
                <Route element={<MainLayout />}>
                  {/* Home */}
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  
                  {/* Recipes */}
                  <Route path={ROUTES.RECIPES} element={<RecipesPage />} />
                  <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetailPage />} />
                  
                  {/* Categories */}
                  <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
                  <Route path={ROUTES.CATEGORY_DETAIL} element={<CategoryDetailPage />} />
                  
                  {/* Search */}
                  <Route path={ROUTES.SEARCH} element={<SearchPage />} />
                  
                  {/* Information */}
                  <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                  <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                  <Route path={ROUTES.BLOG} element={<BlogPage />} />
                  <Route path={ROUTES.FAQ} element={<FAQPage />} />
                  
                  {/* Legal */}
                  <Route path="/terms" element={<div>Terms of Service</div>} />
                  <Route path="/privacy" element={<div>Privacy Policy</div>} />
                  <Route path="/cookies" element={<div>Cookie Policy</div>} />
                </Route>

                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={
                    <PublicRoute restricted>
                      <LoginPage />
                    </PublicRoute>
                  } />
                  <Route path="/register" element={
                    <PublicRoute restricted>
                      <RegisterPage />
                    </PublicRoute>
                  } />
                  <Route path="/recovery" element={
                    <PublicRoute restricted>
                      <RecoveryPage />
                    </PublicRoute>
                  } />
                  <Route path="/reset-password/:token" element={
                    <PublicRoute restricted>
                      <ResetPasswordPage />
                    </PublicRoute>
                  } />
                  <Route path="/verify-email/:token?" element={
                    <PublicRoute>
                      <VerifyEmailPage />
                    </PublicRoute>
                  } />
                </Route>

                {/* User Routes (Protected) */}
                <Route element={<MainLayout />}>
                  <Route path="/profile" element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  } />
                  <Route path="/my-recipes" element={
                    <PrivateRoute>
                      <MyRecipesPage />
                    </PrivateRoute>
                  } />
                  <Route path="/favorites" element={
                    <PrivateRoute>
                      <FavoritesPage />
                    </PrivateRoute>
                  } />
                  <Route path="/settings" element={
                    <PrivateRoute>
                      <SettingsPage />
                    </PrivateRoute>
                  } />
                  <Route path="/recipes/new" element={
                    <PrivateRoute>
                      <CreateRecipePage />
                    </PrivateRoute>
                  } />
                  <Route path="/recipes/:id/edit" element={
                    <PrivateRoute>
                      <EditRecipePage />
                    </PrivateRoute>
                  } />
                </Route>

                {/* Admin Routes (Protected with admin role) */}
                <Route element={<MainLayout />}>
                  <Route path="/admin" element={
                    <PrivateRoute roles={['admin']}>
                      <AdminDashboard />
                    </PrivateRoute>
                  } />
                </Route>

                {/* Error Pages */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="/500" element={<ServerErrorPage />} />
                <Route path="/maintenance" element={<MaintenancePage />} />
                
                {/* Fallback Routes */}
                <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;