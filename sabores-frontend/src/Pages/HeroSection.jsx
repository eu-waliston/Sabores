import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {FaArrowDown, FaPlay, FaFire, FaUsers, FaAward} from "react-icons/fa";
import "./HeroSection.scss";

const HeroSection = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [stats, setStats] = useState({
        recipes: 0,
        users: 0,
        categories: 0,
        ratings: 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        // Mock stats - será substituído pela API
        const loadStats = () => {
            setTimeout(() => {
                setStats({
                    recipes: 1256,
                    users: 8421,
                    categories: 24,
                    ratings: 4.8,
                });
            }, 500);
        };

        window.addEventListener("scroll", handleScroll);
        loadStats();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToFeed = (e) => {
        e.preventDefault();
        const feedSection = document.getElementById("feed");
        if (feedSection) {
            feedSection.scrollIntoView({behavior: "smooth"});
        }
    };

    return (
        <section className="hero-section">
            {/* Background com efeitos */}
            <div className="hero-section__background">
                <div className="hero-section__particles"></div>
                <div className="hero-section__gradient"></div>
            </div>

            <div className="hero-section__container">
                {/* Conteúdo principal */}
                <div className="hero-section__content">
                    <div className="hero-section__brand">
                        <div className="hero-section__logo-container">
                            <img
                                src="/images/Sabores-Logo.png"
                                alt="Sabores"
                                className="hero-section__logo"
                            />
                            <div className="hero-section__logo-glow"></div>
                        </div>

                        <div className="hero-section__title-container">
                            <h1 className="hero-section__title">
                                <span className="hero-section__title-main">Sabores</span>
                                <span className="hero-section__title-sub">
                  Sua jornada culinária começa aqui
                </span>
                            </h1>

                            <p className="hero-section__description">
                                Descubra, compartilhe e saboreie milhares de receitas criadas por
                                uma comunidade apaixonada por gastronomia.
                            </p>
                        </div>
                    </div>

                    {/* Estatísticas */}
                    <div className="hero-section__stats">
                        <div className="hero-section__stat">
                            <div className="hero-section__stat-icon">
                                <FaFire/>
                            </div>
                            <div className="hero-section__stat-content">
                <span className="hero-section__stat-number">
                  {stats.recipes.toLocaleString()}+
                </span>
                                <span className="hero-section__stat-label">Receitas</span>
                            </div>
                        </div>

                        <div className="hero-section__stat">
                            <div className="hero-section__stat-icon">
                                <FaUsers/>
                            </div>
                            <div className="hero-section__stat-content">
                <span className="hero-section__stat-number">
                  {stats.users.toLocaleString()}+
                </span>
                                <span className="hero-section__stat-label">Food Lovers</span>
                            </div>
                        </div>

                        <div className="hero-section__stat">
                            <div className="hero-section__stat-icon">
                                <FaAward/>
                            </div>
                            <div className="hero-section__stat-content">
                <span className="hero-section__stat-number">
                  {stats.ratings}
                </span>
                                <span className="hero-section__stat-label">Avaliação Média</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-section__actions">
                        <Link
                            to="/receitas"
                            className="hero-section__button hero-section__button--primary"
                        >
                            <span className="hero-section__button-text">Explorar Receitas</span>
                            <FaPlay className="hero-section__button-icon"/>
                        </Link>

                        <Link
                            to="/criar"
                            className="hero-section__button hero-section__button--secondary"
                        >
                            <span className="hero-section__button-text">Compartilhar Receita</span>
                        </Link>
                    </div>

                    {/* Search preview */}
                    <div className="hero-section__search-preview">
                        <div className="hero-section__search-tags">
                            <span className="hero-section__search-tag">🍝 Massas</span>
                            <span className="hero-section__search-tag">🥩 Carnes</span>
                            <span className="hero-section__search-tag">🍰 Sobremesas</span>
                            <span className="hero-section__search-tag">🥗 Saudável</span>
                            <span className="hero-section__search-tag">⚡ Rápido</span>
                        </div>
                        <p className="hero-section__search-hint">
                            Procure por categorias, ingredientes ou tempo de preparo
                        </p>
                    </div>
                </div>

                 {/*Imagem destaque */}
                <div className="hero-section__image-container">
                    <div className="hero-section__image-wrapper">
                        <img
                            src="./food-res.jpg"
                            alt="Prato gourmet"
                            className="hero-section__image"
                            loading="eager"
                        />
                        <div className="hero-section__image-overlay"></div>
                        <div className="hero-section__image-badge">
                            <span className="hero-section__badge-text">Receita da Semana</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <button
                className={`hero-section__scroll-indicator ${
                    scrollPosition > 100 ? "hero-section__scroll-indicator--hidden" : ""
                }`}
                onClick={scrollToFeed}
                aria-label="Role para descobrir mais"
            >
                <FaArrowDown className="hero-section__scroll-icon"/>
                <span className="hero-section__scroll-text">Descobrir</span>
            </button>
        </section>
    );
};

export default HeroSection;