import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../Components/Common/PrivateRoute';
import PublicRoute from '../Components/Common/PublicRoute';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import { ROUTES } from './constants';

// Layouts
const MainLayout = lazy(() => import('../MainLayout'));

// Páginas Públicas
const Home = lazy(() => import('../Pages/Home'));
const Feed = lazy(() => import('../Components/Feed/Feed'));
const NotFound = lazy(() => import('../Pages/NotFoundPage'));

// Páginas de Autenticação
const Login = lazy(() => import('../Components/User/auth/Login'));
const Register = lazy(() => import('../Components/User/auth/Register'));
const Recovery = lazy(() => import('../Components/User/auth/Recovery'));
const ResetPassword = lazy(() => import('../Components/User/auth/ResetPassword'));
const VerifyEmail = lazy(() => import('../Components/User/auth/VerifyEmail'));

// Páginas do Usuário (Protegidas)
// const Profile = lazy(() => import('../Pages/User/Profile'));
const MyRecipes = lazy(() => import('../Components/Feed/Feed'));
const CreateRecipe = lazy(() => import('../Pages/FeaturesSection'));
const RecipeDetail = lazy(() => import('../Pages/FeaturesSection')); //fica de olho aquio

// Páginas de Categorias
const Categories = lazy(() => import('../Pages/StatsSection'));
const CategoryDetail = lazy(() => import('../Pages/HomeWrapper'));

// Outras Páginas
// const About = lazy(() => import('../Pages/About/About'));
// const Contact = lazy(() => import('../Pages/Contact/Contact'));
// const Blog = lazy(() => import('../Pages/Blog/Blog'));
// const FAQ = lazy(() => import('../Pages/FAQ/FAQ'));
const Search = lazy(() => import('../Pages/FeaturesSection'));

// Páginas de Erro
const ServerError = lazy(() => import('../Pages/ServerError'));
const Maintenance = lazy(() => import('../Pages/Error/Maintenance'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner fullScreen text="Carregando..." />}>
            <Routes>
                {/* Layout Principal */}
                <Route element={<MainLayout />}>
                    {/* Home */}
                    <Route path={ROUTES.HOME} element={<Home />} />

                    {/* Feed de Receitas */}
                    <Route path={ROUTES.FEED} element={<Feed />} />

                    {/* Receitas */}
                    <Route path={ROUTES.RECIPES} element={<div>Lista de Receitas</div>} />
                    <Route path={ROUTES.RECIPE_DETAIL} element={<RecipeDetail />} />

                    {/* Categorias */}
                    <Route path={ROUTES.CATEGORIES} element={<Categories />} />
                    <Route path={ROUTES.CATEGORY_DETAIL} element={<CategoryDetail />} />

                    {/* Busca */}
                    <Route path={ROUTES.SEARCH} element={<Search />} />

                    {/* Informações */}
                    {/*<Route path={ROUTES.ABOUT} element={<About />} />*/}
                    {/*<Route path={ROUTES.CONTACT} element={<Contact />} />*/}
                    {/*<Route path={ROUTES.BLOG} element={<Blog />} />*/}
                    {/*<Route path={ROUTES.FAQ} element={<FAQ />} />*/}

                    {/* Termos e Políticas */}
                    <Route path="/termos" element={<div>Termos de Serviço</div>} />
                    <Route path="/privacidade" element={<div>Política de Privacidade</div>} />
                    <Route path="/cookies" element={<div>Política de Cookies</div>} />

                    {/* Erros */}
                    <Route path="/500" element={<ServerError />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                </Route>

                {/* Rotas de Autenticação (Sem Layout Principal) */}
                <Route path={ROUTES.LOGIN} element={
                    <PublicRoute restricted>
                        <Login />
                    </PublicRoute>
                } />

                <Route path={ROUTES.REGISTER} element={
                    <PublicRoute restricted>
                        <Register />
                    </PublicRoute>
                } />

                <Route path={ROUTES.RECOVERY} element={
                    <PublicRoute restricted>
                        <Recovery />
                    </PublicRoute>
                } />

                <Route path={ROUTES.RESET_PASSWORD} element={
                    <PublicRoute restricted>
                        <ResetPassword />
                    </PublicRoute>
                } />

                <Route path={ROUTES.VERIFY_EMAIL} element={
                    <PublicRoute>
                        <VerifyEmail />
                    </PublicRoute>
                } />

                {/* Rotas Protegidas do Usuário */}
                {/*<Route path={ROUTES.PROFILE} element={*/}
                {/*    <PrivateRoute>*/}
                {/*        <Profile />*/}
                {/*    </PrivateRoute>*/}
                {/*} />*/}

                <Route path={ROUTES.MY_RECIPES} element={
                    <PrivateRoute>
                        <MyRecipes />
                    </PrivateRoute>
                } />

                <Route path={ROUTES.CREATE_RECIPE} element={
                    <PrivateRoute>
                        <CreateRecipe />
                    </PrivateRoute>
                } />

                {/* Rotas de Admin (Protegidas com role) */}
                <Route path="/admin/*" element={
                    <PrivateRoute roles={['admin']}>
                        <div>Admin Dashboard</div>
                    </PrivateRoute>
                } />

                {/* Redirecionamentos */}
                <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />

                {/* 404 - Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;