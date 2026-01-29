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
  backLinkTo = "/",

  // 🔥 NOVAS PROPS
  showLegal = false,
  showLoginHint = false,
  loginHintText = "Já possui uma conta?",
  loginHintLinkText = "Faça login",
  loginHintTo = "/login",
}) => {
  return (
    <div className="auth-layout">
      {/* Background */}
      <div className="auth-layout__background">
        <div className="auth-layout__pattern"></div>
        <div className="auth-layout__gradient"></div>
      </div>

      <div className="auth-layout__container">
        {/* Sidebar */}
        <div className="auth-layout__sidebar">
          {showLogo && (
            <div className="auth-layout__logo">
              <Link to="/" className="auth-layout__logo-link">

                <div className="auth-layout__logo-text">
                  <h1 className="auth-layout__logo-title">Sabores</h1>
                  <p className="auth-layout__logo-subtitle">
                    Receitas & Culinária
                  </p>
                </div>
              </Link>
            </div>
          )}

          <div className="auth-layout__sidebar-content">
            <h2 className="auth-layout__sidebar-title">
              Junte-se à nossa comunidade de food lovers
            </h2>
            <ul className="auth-layout__features">
              <li>🍳 Milhares de receitas</li>
              <li>👨‍🍳 Chefs profissionais</li>
              <li>❤️ Compartilhe suas criações</li>
              <li>📱 Acesse de qualquer lugar</li>
            </ul>
          </div>

          {/* 🔥 LOGIN HINT (condicional) */}
          {showLoginHint && (
            <div className="auth-layout__sidebar-footer">
              <p className="auth-layout__footer-text">
                {loginHintText}{" "}
                <Link to={loginHintTo} className="auth-layout__footer-link">
                  {loginHintLinkText}
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Main */}
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

          {/* 🔥 TERMOS (condicional) */}
          {showLegal && (
            <div className="auth-layout__footer">
              <p className="auth-layout__footer-text">
                Ao continuar, você concorda com nossos{" "}
                <Link to="/termos">Termos de Serviço</Link> e{" "}
                <Link to="/privacidade">Política de Privacidade</Link>
              </p>
            </div>
          )}
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

  showLegal: PropTypes.bool,
  showLoginHint: PropTypes.bool,
  loginHintText: PropTypes.string,
  loginHintLinkText: PropTypes.string,
  loginHintTo: PropTypes.string,
};

export default AuthLayout;
