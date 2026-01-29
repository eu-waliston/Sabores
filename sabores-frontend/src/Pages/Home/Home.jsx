import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../HeroSection/HeroSection";
import StatsSection from "../StatsSection/StatsSection";

import FeaturesSection from "../FeaturesSection/FeaturesSection";
import CTA from "../CTA/CTA.jsx";
import Feed from "../../Components/Feed/Feed";
import Footer from "../../Components/Footer/Footer";
import "./Home.scss";

const Home = () => {
  useEffect(() => {
    // Scroll suave para âncoras
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.hash && target.hash.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <Helmet>
        <title>Sabores - Descubra, compartilhe e saboreie as melhores receitas</title>
        <meta
          name="description"
          content="Comunidade de food lovers compartilhando milhares de receitas.
          Encontre receitas por ingredientes, tempo de preparo, dificuldade e muito mais."
        />
        <meta
          name="keywords"
          content="receitas, culinária, comida, chef, cozinha, gastronomia, pratos, sobremesas"
        />
        <meta property="og:title" content="Sabores - Receitas Online" />
        <meta property="og:description" content="Sua jornada culinária começa aqui" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sabores.com" />
      </Helmet>

      <main className="home">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Feed Section */}
        <section id="feed" className="home__feed-section">
          <div className="home__feed-container">
            <div className="home__feed-header">
              <h2 className="home__feed-title">Receitas em Destaque</h2>
              <p className="home__feed-subtitle">
                As receitas mais populares da nossa comunidade esta semana
              </p>
            </div>
            <Feed />
          </div>
        </section>

        {/* CTA Section */}
        <CTA />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default Home;