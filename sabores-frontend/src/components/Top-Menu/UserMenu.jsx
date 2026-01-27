import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  FaUser, 
  FaSignOutAlt, 
  FaCog, 
  FaBookmark, 
  FaHeart,
  FaPlus,
  FaChevronDown,
  FaUserCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./UserMenu.scss";

const UserMenu = ({ 
  user,
  onLogin,
  onLogout,
  onProfileClick,
  onCreateRecipe
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    setIsOpen(false);
    onLogin?.();
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  const handleCreateRecipe = () => {
    setIsOpen(false);
    onCreateRecipe?.();
  };

  if (!user) {
    return (
      <div className="user-menu">
        <button
          className="user-menu__login-button"
          onClick={handleLogin}
          aria-label="Entrar na conta"
        >
          <FaUser className="user-menu__login-icon" />
          <span className="user-menu__login-text">Entrar</span>
        </button>
      </div>
    );
  }

  const userInitials = user.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className={`user-menu__toggle ${isOpen ? 'user-menu__toggle--open' : ''}`}
        onClick={toggleMenu}
        aria-label="Menu do usuário"
        aria-expanded={isOpen}
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || 'Usuário'}
            className="user-menu__avatar"
          />
        ) : userInitials ? (
          <div className="user-menu__avatar-initials">
            {userInitials}
          </div>
        ) : (
          <FaUserCircle className="user-menu__avatar-icon" />
        )}
        
        <span className="user-menu__name">
          {user.name?.split(' ')[0] || 'Usuário'}
        </span>
        
        <FaChevronDown className={`user-menu__chevron ${isOpen ? 'user-menu__chevron--open' : ''}`} />
      </button>

      {isOpen && (
        <div className="user-menu__dropdown">
          {/* Header do dropdown */}
          <div className="user-menu__dropdown-header">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'Usuário'}
                className="user-menu__dropdown-avatar"
              />
            ) : (
              <div className="user-menu__dropdown-avatar-initials">
                {userInitials || 'U'}
              </div>
            )}
            
            <div className="user-menu__dropdown-info">
              <h4 className="user-menu__dropdown-name">
                {user.name || 'Usuário'}
              </h4>
              <p className="user-menu__dropdown-email">
                {user.email || 'usuario@exemplo.com'}
              </p>
            </div>
          </div>

          {/* Links principais */}
          <div className="user-menu__dropdown-links">
            <Link 
              to="/perfil" 
              className="user-menu__dropdown-link"
              onClick={() => {
                setIsOpen(false);
                onProfileClick?.();
              }}
            >
              <FaUserCircle className="user-menu__dropdown-link-icon" />
              <span>Meu Perfil</span>
            </Link>

            <Link 
              to="/minhas-receitas" 
              className="user-menu__dropdown-link"
              onClick={() => setIsOpen(false)}
            >
              <FaBookmark className="user-menu__dropdown-link-icon" />
              <span>Minhas Receitas</span>
              {user.recipeCount > 0 && (
                <span className="user-menu__dropdown-count">
                  {user.recipeCount}
                </span>
              )}
            </Link>

            <Link 
              to="/favoritos" 
              className="user-menu__dropdown-link"
              onClick={() => setIsOpen(false)}
            >
              <FaHeart className="user-menu__dropdown-link-icon" />
              <span>Favoritos</span>
              {user.favoriteCount > 0 && (
                <span className="user-menu__dropdown-count">
                  {user.favoriteCount}
                </span>
              )}
            </Link>

            <Link 
              to="/configuracoes" 
              className="user-menu__dropdown-link"
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="user-menu__dropdown-link-icon" />
              <span>Configurações</span>
            </Link>
          </div>

          {/* Botão de criar receita */}
          <div className="user-menu__dropdown-actions">
            <button
              className="user-menu__create-button"
              onClick={handleCreateRecipe}
              aria-label="Criar nova receita"
            >
              <FaPlus className="user-menu__create-icon" />
              <span>Criar Receita</span>
            </button>
          </div>

          {/* Logout */}
          <div className="user-menu__dropdown-footer">
            <button
              className="user-menu__logout-button"
              onClick={handleLogout}
              aria-label="Sair da conta"
            >
              <FaSignOutAlt className="user-menu__logout-icon" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

UserMenu.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    recipeCount: PropTypes.number,
    favoriteCount: PropTypes.number,
  }),
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  onProfileClick: PropTypes.func,
  onCreateRecipe: PropTypes.func,
};

export default UserMenu;