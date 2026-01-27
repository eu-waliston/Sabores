import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CategoryIcon from "./CategoryIcon";
import "./MenuItem.scss";

const MenuItem = ({ 
  category,
  label,
  count,
  isActive = false,
  isCollapsed = false,
  onClick,
  to,
  href
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(category);
    }
  };

  const content = (
    <>
      <div className="menu-item__icon">
        <CategoryIcon 
          category={category} 
          size={isCollapsed ? "lg" : "md"}
          color={isActive ? "#ffffff" : "inherit"}
        />
      </div>
      
      {!isCollapsed && (
        <div className="menu-item__content">
          <span className="menu-item__label">{label}</span>
          {count !== undefined && (
            <span className="menu-item__count">{count}</span>
          )}
        </div>
      )}
      
      {!isCollapsed && isActive && (
        <div className="menu-item__indicator"></div>
      )}
    </>
  );

  const className = `menu-item ${isActive ? 'menu-item--active' : ''} ${isCollapsed ? 'menu-item--collapsed' : ''}`;

  if (to) {
    return (
      <Link 
        to={to}
        className={className}
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        aria-label={isCollapsed ? label : undefined}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a 
        href={href}
        className={className}
        onClick={handleClick}
        aria-label={isCollapsed ? label : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      className={className}
      onClick={handleClick}
      aria-label={isCollapsed ? label : undefined}
      aria-pressed={isActive}
    >
      {content}
    </button>
  );
};

MenuItem.propTypes = {
  category: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
  isActive: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  onClick: PropTypes.func,
  to: PropTypes.string,
  href: PropTypes.string,
};

export default MenuItem;