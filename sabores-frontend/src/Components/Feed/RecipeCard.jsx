import React from "react";
import PropTypes from "prop-types";
import { BsClock } from "react-icons/bs";
import { BiBowlRice } from "react-icons/bi";
import "./RecipeCard.scss";

const RecipeCard = ({ 
  recipe, 
  size = "medium", 
  onClick 
}) => {
  const {
    id,
    name,
    image,
    prepTime,
    servings,
    cookTime,
    category,
    difficulty
  } = recipe;

  const getSizeClass = () => {
    switch(size) {
      case "large": return "recipe-card--large";
      case "small": return "recipe-card--small";
      default: return "recipe-card--medium";
    }
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} Min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}H ${mins > 0 ? `${mins}Min` : ''}`.trim();
  };

  return (
    <div 
      className={`recipe-card ${getSizeClass()}`}
      onClick={() => onClick && onClick(id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick && onClick(id)}
    >
      <div className="recipe-card__image-container">
        <img
          src={image}
          alt={name}
          className="recipe-card__image"
          loading="lazy"
        />
        {difficulty && (
          <span className="recipe-card__difficulty-badge">
            {difficulty}
          </span>
        )}
        {category && (
          <span className="recipe-card__category-badge">
            {category}
          </span>
        )}
      </div>

      <div className="recipe-card__content">
        <div className="recipe-card__meta">
          <div className="recipe-card__meta-item">
            <BsClock className="recipe-card__icon" />
            <span>{formatTime(prepTime + (cookTime || 0))}</span>
          </div>
          <div className="recipe-card__meta-item">
            <BiBowlRice className="recipe-card__icon" />
            <span>{servings} Porção{servings !== 1 ? 'es' : ''}</span>
          </div>
        </div>

        <h3 className="recipe-card__title">{name}</h3>

        <button 
          className="recipe-card__button"
          aria-label={`Ver receita de ${name}`}
        >
          Ver Receita
        </button>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    prepTime: PropTypes.number,
    servings: PropTypes.number,
    cookTime: PropTypes.number,
    category: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onClick: PropTypes.func,
};

export default RecipeCard;