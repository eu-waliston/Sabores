import React from "react";
import MenuToggle from "./MenuToggle";
import MenuItem from "./MenuItem";
import useLeftMenu from "./useLeftMenu";
import "./LeftMenu.scss";

const LeftMenu = () => {
  const {
    isCollapsed,
    activeCategory,
    categories,
    toggleMenu,
    handleCategoryClick,
  } = useLeftMenu();

  return (
    <div className={`left-menu ${isCollapsed ? 'left-menu--collapsed' : ''}`}>
      <MenuToggle
        isCollapsed={isCollapsed}
        onClick={toggleMenu}
        position="fixed"
      />

      <nav
        className="left-menu__nav"
        aria-label="Menu de categorias"
      >
        <div className="left-menu__header">
          {!isCollapsed && (
            <h2 className="left-menu__title">Categorias</h2>
          )}
        </div>

        <div className="left-menu__items">
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              category={category.id}
              label={category.label}
              count={category.count}
              isActive={activeCategory === category.id}
              isCollapsed={isCollapsed}
              onClick={() => handleCategoryClick(category.id)}
              to={category.to}
            />
          ))}
        </div>

        {!isCollapsed && (
          <div className="left-menu__footer">
            <div className="left-menu__stats">
              <span className="left-menu__total">
                {categories.reduce((sum, cat) => sum + cat.count, 0)} receitas
              </span>
              <span className="left-menu__categories">
                {categories.length} categorias
              </span>
            </div>

            <button
              className="left-menu__filter-button"
              onClick={() => console.log('Abrir filtros')}
              aria-label="Filtrar receitas"
            >
              <span className="left-menu__filter-icon">⚙️</span>
              <span>Filtros Avançados</span>
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default LeftMenu;