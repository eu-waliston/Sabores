import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBook,
  FaShareAlt,
  FaHeart,
  FaMobileAlt,
  FaBell,
  FaFilter,
  FaComments
} from "react-icons/fa";
import "./FeaturesSection.scss";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: FaSearch,
      title: "Busca Inteligente",
      description: "Encontre receitas por ingredientes, tempo de preparo, dificuldade e muito mais.",
      color: "#FF6B6B"
    },
    {
      id: 2,
      icon: FaBook,
      title: "Livro de Receitas Digital",
      description: "Salve suas receitas favoritas e crie suas próprias coleções personalizadas.",
      color: "#4ECDC4"
    },
    {
      id: 3,
      icon: FaShareAlt,
      title: "Compartilhamento Fácil",
      description: "Compartilhe suas criações culinárias com a comunidade e receba feedback.",
      color: "#FFD166"
    },
    {
      id: 4,
      icon: FaHeart,
      title: "Sugestões Personalizadas",
      description: "Receba recomendações baseadas no seu histórico e preferências.",
      color: "#06D6A0"
    },
    {
      id: 5,
      icon: FaMobileAlt,
      title: "App Móvel",
      description: "Acesse suas receitas de qualquer lugar com nosso aplicativo mobile.",
      color: "#118AB2"
    },
    {
      id: 6,
      icon: FaBell,
      title: "Lembretes Inteligentes",
      description: "Configure lembretes para compras de ingredientes e horários de preparo.",
      color: "#073B4C"
    },
    {
      id: 7,
      icon: FaFilter,
      title: "Filtros Avançados",
      description: "Filtre por dietas especiais, restrições alimentares e estilos culinários.",
      color: "#7209B7"
    },
    {
      id: 8,
      icon: FaComments,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros food lovers, tire dúvidas e compartilhe dicas.",
      color: "#F72585"
    }
  ];

  return (
    <section className="features-section">
      <div className="features-section__container">
        <div className="features-section__header">
          <h2 className="features-section__title">
            Tudo o que você precisa em um só lugar
          </h2>
          <p className="features-section__subtitle">
            Recursos pensados para tornar sua experiência culinária ainda mais especial
          </p>
        </div>

        <div className="features-section__grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="features-section__card">
                <div 
                  className="features-section__card-icon-wrapper"
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}10 100%)`,
                    borderColor: `${feature.color}30`
                  }}
                >
                  <Icon 
                    className="features-section__card-icon"
                    style={{ color: feature.color }}
                  />
                  <div 
                    className="features-section__card-glow"
                    style={{ backgroundColor: feature.color }}
                  />
                </div>
                
                <div className="features-section__card-content">
                  <h3 className="features-section__card-title">
                    {feature.title}
                  </h3>
                  <p className="features-section__card-description">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="features-section__cta">
          <Link to="/register" className="features-section__cta-button">
            Comece Agora - É Gratuito!
          </Link>
          <p className="features-section__cta-note">
            Sem cartão de crédito necessário
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;