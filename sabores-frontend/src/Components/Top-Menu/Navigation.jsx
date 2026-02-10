import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCompass,
  FaFire,
  FaPlusCircle,
  FaBook,
  FaQuestionCircle
} from "react-icons/fa";
import "./Navigation.scss";

const Navigation = ({
  items = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/descobrir", label: "Descobrir", icon: FaCompass },
    { path: "/populares", label: "Populares", icon: FaFire },
    { path: "/criar", label: "Criar", icon: FaPlusCircle },
    { path: "/blog", label: "Blog", icon: FaBook },
    { path: "/ajuda", label: "Ajuda", icon: FaQuestionCircle },
  ],
  variant = "desktop",
  onItemClick
}) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isMobile = variant === "mobile";

  return (
    <nav
      className={`navigation navigation--${variant}`}
      aria-label="Navegação principal"
    >
      <ul className="navigation__list">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <li
              key={item.path}
              className="navigation__item"
              onMouseEnter={() => !isMobile && setHoveredItem(item.path)}
              onMouseLeave={() => !isMobile && setHoveredItem(null)}
            >
              <Link
                to={item.path}
                onClick={isMobile ? onItemClick : undefined}
                className={`navigation__link ${active ? 'navigation__link--active' : ''}`}
                aria-current={active ? "page" : undefined}
              >
                <div className="navigation__icon-container">
                  <Icon className="navigation__icon" />
                  {item.badge && (
                    <span className="navigation__badge">{item.badge}</span>
                  )}
                </div>

                <span className="navigation__label">{item.label}</span>

                {!isMobile && hoveredItem === item.path && !active && (
                  <div className="navigation__hover-indicator"></div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      badge: PropTypes.number,
    })
  ),
  variant: PropTypes.oneOf(["desktop", "mobile"]),
};

export default Navigation;