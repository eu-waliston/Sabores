import React, { useState, useEffect } from "react";
import LeftMenu from "./LeftMenu";
import "./LeftMenuWrapper.scss";

const LeftMenuWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isMobile && isMenuOpen && (
        <div
          className="left-menu-overlay left-menu-overlay--visible"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Menu modificado para mobile */}
      <div className={`left-menu-wrapper ${isMobile ? 'left-menu-wrapper--mobile' : ''}`}>
        <div
          className={`left-menu-container ${isMobile && isMenuOpen ? 'left-menu-container--open' : ''}`}
        >
          <LeftMenu
            onToggle={isMobile ? toggleMenu : undefined}
            isMobile={isMobile}
          />
        </div>

        {/* Conteúdo principal com padding ajustado */}
        <div
          className="left-menu-content"
          style={{
            paddingLeft: isMobile ? 0 : '320px',
            transition: 'padding-left 0.4s ease'
          }}
        >
          {children}
        </div>
      </div>

      {/* Botão de menu para mobile (hamburger) */}
      {isMobile && (
        <button
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="mobile-menu-toggle__icon">
            {isMenuOpen ? '✕' : '☰'}
          </span>
        </button>
      )}
    </>
  );
};

export default LeftMenuWrapper;