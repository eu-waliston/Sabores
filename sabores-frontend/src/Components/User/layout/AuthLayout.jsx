import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./AuthLayout.scss";

const AuthLayout = ({ 
  children, 
  title, 
  subtitle,
  showLogo = true,
  showBackLink = false,
  backLinkText = "Voltar",
  backLinkTo = "/"
}) => {
  return (
    <div className="auth-layout">
      {/* Background decorativo */}
      <div className="auth-layout__background">
        <div className="auth-layout__pattern"></div>
        <div className="auth-layout__gradient"></div>
      </div>

      {/* Conteúdo */}
      <div className="auth-layout__container">
        {/* Sidebar (imagem/branding) */}
        <div className="auth-layout__sidebar">
          {showLogo && (
            <div className="auth-layout__logo">
              <Link to="/" className="auth-layout__logo-link">
                <img
                  src="/images/Sabores-Logo.png"
                  alt="Sabores"
                  className="auth-layout__logo-image"
                />
                <div className="auth-layout__logo-text">
                  <h1 className="auth-layout__logo-title">Sabores</h1>
                  <p className="auth-layout__logo-subtitle">Receitas & Culinária</p>
                </div>
              </Link>
            </div>
          )}

          <div className="auth-layout__sidebar-content">
            <h2 className="auth-layout__sidebar-title">
              Junte-se à nossa comunidade de food lovers
            </h2>
            <ul className="auth-layout__features">
              <li className="auth-layout__feature">
                <span className="auth-layout__feature-icon">🍳</span>
                <span className="auth-layout__feature-text">Milhares de receitas</span>
              </li>
              <li className="auth-layout__feature">
                <span className="auth-layout__feature-icon">👨‍🍳</span>
                <span className="auth-layout__feature-text">Chefs profissionais</span>
              </li>
              <li className="auth-layout__feature">
                <span className="auth-layout__feature-icon">❤️</span>
                <span className="auth-layout__feature-text">Compartilhe suas criações</span>
              </li>
              <li className="auth-layout__feature">
                <span className="auth-layout__feature-icon">📱</span>
                <span className="auth-layout__feature-text">Acesse de qualquer lugar</span>
              </li>
            </ul>
          </div>

          <div className="auth-layout__sidebar-footer">
            <p className="auth-layout__footer-text">
              Já possui uma conta?{" "}
              <Link to="/login" className="auth-layout__footer-link">
                Faça login
              </Link>
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="auth-layout__main">
          {showBackLink && (
            <Link to={backLinkTo} className="auth-layout__back-link">
              ← {backLinkText}
            </Link>
          )}

          <div className="auth-layout__content">
            <div className="auth-layout__header">
              {title && <h1 className="auth-layout__title">{title}</h1>}
              {subtitle && <p className="auth-layout__subtitle">{subtitle}</p>}
            </div>

            {children}
          </div>

          <div className="auth-layout__footer">
            <p className="auth-layout__footer-text">
              Ao continuar, você concorda com nossos{" "}
              <Link to="/termos" className="auth-layout__footer-link">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link to="/privacidade" className="auth-layout__footer-link">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showLogo: PropTypes.bool,
  showBackLink: PropTypes.bool,
  backLinkText: PropTypes.string,
  backLinkTo: PropTypes.string,
};

export default AuthLayout;