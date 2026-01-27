import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMobileAlt, FaUsers, FaCrown } from "react-icons/fa";
import "./CTA.scss";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-section__container">
        {/* Left side - Main CTA */}
        <div className="cta-section__main">
          <h2 className="cta-section__title">
            Pronto para transformar sua experiência culinária?
          </h2>
          
          <p className="cta-section__description">
            Junte-se a milhares de food lovers e descubra um mundo de sabores, 
            técnicas e inspirações. Tudo isso de forma gratuita!
          </p>

          <div className="cta-section__buttons">
            <Link to="/register" className="cta-section__button cta-section__button--primary">
              <span className="cta-section__button-text">Criar Minha Conta</span>
              <FaArrowRight className="cta-section__button-icon" />
            </Link>
            
            <Link to="/receitas" className="cta-section__button cta-section__button--secondary">
              <span className="cta-section__button-text">Ver Receitas</span>
            </Link>
          </div>

          <div className="cta-section__stats">
            <div className="cta-section__stat">
              <div className="cta-section__stat-icon">
                <FaUsers />
              </div>
              <div className="cta-section__stat-content">
                <span className="cta-section__stat-number">8.4K+</span>
                <span className="cta-section__stat-label">Usuários Felizes</span>
              </div>
            </div>
            
            <div className="cta-section__stat">
              <div className="cta-section__stat-icon">
                <FaCrown />
              </div>
              <div className="cta-section__stat-content">
                <span className="cta-section__stat-number">4.8</span>
                <span className="cta-section__stat-label">Avaliação Média</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - App preview */}
        <div className="cta-section__app">
          <div className="cta-section__app-container">
            <div className="cta-section__app-screen">
              <div className="cta-section__app-header">
                <div className="cta-section__app-logo">
                  <img
                    src="/images/Sabores-Logo.png"
                    alt="Sabores App"
                    className="cta-section__app-logo-image"
                  />
                </div>
                <div className="cta-section__app-title">Sabores App</div>
              </div>
              
              <div className="cta-section__app-content">
                <h3 className="cta-section__app-title">Receitas na palma da sua mão</h3>
                <p className="cta-section__app-description">
                  Baixe nosso app e tenha acesso a todas as receitas offline!
                </p>
                
                <div className="cta-section__app-features">
                  <div className="cta-section__app-feature">
                    <FaMobileAlt className="cta-section__app-feature-icon" />
                    <span className="cta-section__app-feature-text">App Nativo</span>
                  </div>
                  <div className="cta-section__app-feature">
                    <FaMobileAlt className="cta-section__app-feature-icon" />
                    <span className="cta-section__app-feature-text">Modo Offline</span>
                  </div>
                  <div className="cta-section__app-feature">
                    <FaMobileAlt className="cta-section__app-feature-icon" />
                    <span className="cta-section__app-feature-text">Notificações</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cta-section__app-badges">
              <div className="cta-section__app-badge">
                <span className="cta-section__badge-text">Disponível na</span>
                <span className="cta-section__badge-store">App Store</span>
              </div>
              
              <div className="cta-section__app-badge">
                <span className="cta-section__badge-text">Baixe na</span>
                <span className="cta-section__badge-store">Google Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;