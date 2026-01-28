import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TopMenu from './Components/Top-Menu/TopMenu';
import LeftMenu from './Components/Left-Menu/LeftMenu';
import LeftMenuWrapper from './Components/Left-Menu/LeftMenuWrapper';
import Footer from './Components/Footer/Footer';
import LoadingSpinner from './Components/Common/LoadingSpinner';
import { useAuth } from './Components/User/hooks/useAuth';
import './MainLayout.scss';

const MainLayout = () => {
  const location = useLocation();
  const { loading } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fechar menu left ao navegar (mobile)
    setShowLeftMenu(false);

    // Scroll para o topo
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [location]);

  const toggleLeftMenu = () => {
    setShowLeftMenu(!showLeftMenu);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <Helmet>
        <html lang="pt-BR" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#f97316" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Helmet>

      <div className="main-layout">
        <TopMenu onMenuToggle={toggleLeftMenu} />
        
        <div className="main-layout__content">
          {isMobile ? (
            <>
              {/* Overlay para menu mobile */}
              {showLeftMenu && (
                <div 
                  className="main-layout__overlay"
                  onClick={() => setShowLeftMenu(false)}
                />
              )}
              
              {/* Menu mobile */}
              <div 
                className={`main-layout__left-menu-mobile ${
                  showLeftMenu ? 'main-layout__left-menu-mobile--open' : ''
                }`}
              >
                <LeftMenu onClose={() => setShowLeftMenu(false)} />
              </div>
              
              {/* Conteúdo principal mobile */}
              <div className="main-layout__main">
                <Outlet />
              </div>
            </>
          ) : (
            // Desktop layout com wrapper
            <LeftMenuWrapper>
              <div className="main-layout__main">
                <Outlet />
              </div>
            </LeftMenuWrapper>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default MainLayout;