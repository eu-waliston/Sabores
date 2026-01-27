import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import AppRoutes from './AppRoutes';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Lazy load dos componentes principais
const Layout = lazy(() => import('../components/layout/Layout'));

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <Suspense fallback={<LoadingScreen />}>
            <Layout>
              <AppRoutes />
            </Layout>
          </Suspense>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default RouterConfig;