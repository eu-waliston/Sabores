import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = ({ 
  variant = "default",
  size = "medium",
  showText = true,
  onClick 
}) => {
  const getSizeClass = () => {
    switch(size) {
      case "small": return "logo--small";
      case "large": return "logo--large";
      default: return "logo--medium";
    }
  };

  const getVariantClass = () => {
    return `logo--${variant}`;
  };

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link 
      to="/" 
      className={`logo ${getSizeClass()} ${getVariantClass()}`}
      onClick={handleClick}
      aria-label="Sabores - Página inicial"
    >
      <div className="logo__image-container">
        <img
          src="/images/Sabores-Logo.png"
          alt="Sabores"
          className="logo__image"
          width="60"
          height="60"
        />
        <div className="logo__pulse"></div>
      </div>
      
      {showText && (
        <div className="logo__text">
          <h1 className="logo__title">Sabores</h1>
          <span className="logo__subtitle">Receitas & Culinária</span>
        </div>
      )}
    </Link>
  );
};

Logo.propTypes = {
  variant: PropTypes.oneOf(["default", "minimal", "dark"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  showText: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Logo;