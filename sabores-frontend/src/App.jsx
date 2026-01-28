import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './Components/User/hooks/useAuth';
import ErrorBoundary from './Components/Common/ErrorBoundary';
import AppRoutes from './Routes/AppRoutes';
import './App.scss';

const App = () => {
    return (
        <HelmetProvider>
            <ErrorBoundary>
                <Router>
                    <AuthProvider>
                        <div className="app">
                            <AppRoutes />
                        </div>
                    </AuthProvider>
                </Router>
            </ErrorBoundary>
        </HelmetProvider>
    );
};

export default App;
