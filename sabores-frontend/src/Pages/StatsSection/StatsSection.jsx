import React, { useState, useEffect } from "react";
import { 
  FaUtensils, 
  FaUsers, 
  FaHeart, 
  FaClock,
  FaStar,
  FaGlobe
} from "react-icons/fa";
import CountUp from "react-countup";
import "./StatsSection.scss";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      id: 1,
      icon: FaUtensils,
      value: 1256,
      suffix: "+",
      label: "Receitas Criadas",
      color: "#FF6B6B"
    },
    {
      id: 2,
      icon: FaUsers,
      value: 8421,
      suffix: "+",
      label: "Usuários Ativos",
      color: "#4ECDC4"
    },
    {
      id: 3,
      icon: FaHeart,
      value: 38942,
      suffix: "+",
      label: "Curtidas Totais",
      color: "#FFD166"
    },
    {
      id: 4,
      icon: FaClock,
      value: 156,
      suffix: "hrs",
      label: "Tempo Economizado",
      color: "#06D6A0"
    },
    {
      id: 5,
      icon: FaStar,
      value: 4.8,
      suffix: "/5",
      label: "Avaliação Média",
      color: "#118AB2"
    },
    {
      id: 6,
      icon: FaGlobe,
      value: 12,
      suffix: "+",
      label: "Países Atendidos",
      color: "#073B4C"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="stats-section">
      <div className="stats-section__container">
        <div className="stats-section__header">
          <h2 className="stats-section__title">
            Nossa Comunidade em Números
          </h2>
          <p className="stats-section__subtitle">
            Junte-se a milhares de food lovers que já transformaram suas
            experiências culinárias
          </p>
        </div>

        <div className="stats-section__grid">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="stats-section__card">
                <div 
                  className="stats-section__card-icon"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon 
                    className="stats-section__card-icon-svg"
                    style={{ color: stat.color }}
                  />
                </div>
                
                <div className="stats-section__card-content">
                  <div className="stats-section__card-value">
                    {isVisible ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                        suffix={stat.suffix}
                        className="stats-section__card-number"
                      />
                    ) : (
                      <span className="stats-section__card-number">0{stat.suffix}</span>
                    )}
                  </div>
                  
                  <span className="stats-section__card-label">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="stats-section__footer">
          <p className="stats-section__footer-text">
            E esses números crescem a cada dia! 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;