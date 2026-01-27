import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import Navigation from "./Navigation";
import Notifications from "./Notifications";
import "./TopMenu.scss";

const TopMenu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [notifications] = useState([
    { id: 1, type: 'like', message: 'Maria curtiu sua receita', time: '5 min' },
    { id: 2, type: 'comment', message: 'João comentou na sua receita', time: '1 hora' },
    { id: 3, type: 'follow', message: 'Ana começou a seguir você', time: '2 horas' },
  ]);

  // Mock user - será substituído pelo contexto/auth
  const [user, setUser] = useState(null);

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
    console.log('Redirecionar para login');
    // navigation.navigate('/login');
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

        {/* Ações do usuário */}
        <div className="top-menu__actions">
          {/* Notificações */}
          {user && (
            <Notifications 
              notifications={notifications}
              count={notifications.length}
            />
          )}

          {/* Menu do usuário */}
          <UserMenu 
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onCreateRecipe={handleCreateRecipe}
          />

          {/* Menu hamburger para mobile */}
          {isMobile && (
            <button 
              className="top-menu__hamburger"
              aria-label="Abrir menu"
              onClick={() => console.log('Abrir menu mobile')}
            >
              <span className="top-menu__hamburger-line"></span>
              <span className="top-menu__hamburger-line"></span>
              <span className="top-menu__hamburger-line"></span>
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