import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import Navigation from "./Navigation";
import LeftMenu from "../Left-Menu/LeftMenu"
// import Notifications from "./Notifications";
import { useNavigate } from 'react-router-dom';
import "./TopMenu.scss";

const TopMenu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  // Mock user - será substituído pelo contexto/auth
  const [user, setUser] = useState(null);
  const navigation = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Simular usuário logado após 2 segundos
    const timer = setTimeout(() => {
      setUser({
        id: 1,
        name: "Chef João",
        email: "chef@example.com",
        recipeCount: 12,
        favoriteCount: 8,
      });
    }, 2000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleSearch = (query, filter) => {
    console.log('Busca:', { query, filter });

    // Simular sugestões da API
    const mockSuggestions = [
      "Bolo de chocolate",
      "Frango assado",
      "Salada Caesar",
      "Sopa de legumes",
      "Massas italianas"
    ];
    setSearchSuggestions(mockSuggestions.filter(s =>
      s.toLowerCase().includes(query.toLowerCase())
    ));
  };

  const handleLogin = () => {

    navigation('/login');
  };

  const handleLogout = () => {
    console.log('Fazer logout');
    setUser(null);
  };

  const handleCreateRecipe = () => {
    console.log('Criar nova receita');
    // navigation.navigate('/receitas/nova');
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    console.log("menu lateral");

  }

  return (
    <header
      className={`top-menu ${isScrolled ? 'top-menu--scrolled' : ''} ${isMobile ? 'top-menu--mobile' : ''}`}
      role="banner"
    >
      <div className="top-menu__container">

        {/* Logo */}
        <div className="top-menu__logo">
          <Logo
            variant={isScrolled ? "default" : "default"}
            size={isMobile ? "small" : "medium"}
            showText={!isMobile}
            onClick={handleLogoClick}
          />
        </div>

        {/* Navegação (desktop) */}
        {!isMobile && (
          <div className="top-menu__navigation">
            <Navigation />
          </div>
        )}

        {/* Barra de busca */}
        <div className="top-menu__search">
          <SearchBar
            onSearch={handleSearch}
            suggestions={searchSuggestions}
            showFilters={!isMobile}
            placeholder={isMobile ? "Buscar..." : "Procure sua receita aqui..."}
          />
        </div>

        {/* Menu do usuário */}
        <UserMenu
          user={user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onCreateRecipe={handleCreateRecipe}
        />

        {/* Ações do usuário */}
        <div className="top-menu__actions">
          {/* Notificações */}
          {/*{user && (*/}
          {/*  <Notifications */}
          {/*    notifications={notifications}*/}
          {/*    count={notifications.length}*/}
          {/*  />*/}
          {/*)}*/}

          {/* Menu hamburger para mobile */}
          {isMobile && (
            <button
              className="top-menu__hamburger fa-solid fa-bars"
              aria-label="Abrir menu"
              onClick={toggleMenu}
            >

            </button>


          )}
        </div>
      </div>

      {/* Navegação mobile (se necessário) */}
      {isMobile && (
        <div className="top-menu__mobile-nav">
          <Navigation variant="mobile" />
        </div>
      )}
    </header>
  );
};

export default TopMenu;