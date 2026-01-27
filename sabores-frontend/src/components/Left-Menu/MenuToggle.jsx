import React from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "./MenuToggle.scss";

const MenuToggle = ({ 
  isCollapsed, 
  onClick,
  position = "fixed"
}) => {
  return (
    <button 
      className={`menu-toggle menu-toggle--${position} ${isCollapsed ? 'menu-toggle--collapsed' : ''}`}
      onClick={onClick}
      aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
      aria-expanded={!isCollapsed}
    >
      <div className="menu-toggle__icon">
        {isCollapsed ? (
          <FaChevronRight aria-hidden="true" />
        ) : (
          <FaChevronLeft aria-hidden="true" />
        )}
      </div>
      <span className="menu-toggle__tooltip">
        {isCollapsed ? "Expandir" : "Recolher"}
      </span>
    </button>
  );
};

MenuToggle.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  position: PropTypes.oneOf(["fixed", "absolute", "relative"]),
};

export default MenuToggle;