import React from "react";
import PropTypes from "prop-types";
import {
  FaCakeCandles,
  FaDrumstickBite,
  FaEgg,
  FaFish,
  FaBowlRice,
  FaSpoon,
  FaUtensils,
  FaMartiniGlassCitrus,
  FaCookieBite,
  FaBurger,
  FaHeartPulse,
  FaKitchenSet,
  FaPizzaSlice,
  FaBreadSlice,
  FaLeaf,
  FaIceCream,
  FaMugHot
} from "react-icons/fa6";

const categoryIcons = {
  'bolos-tortas': FaCakeCandles,
  'carnes': FaDrumstickBite,
  'aves': FaEgg,
  'peixes-frutos-mar': FaFish,
  'saladas-molhos': FaBowlRice,
  'sopas': FaSpoon,
  'massas': FaUtensils,
  'bebidas': FaMartiniGlassCitrus,
  'doces-sobremesas': FaCookieBite,
  'lanches': FaBurger,
  'alimentacao-saudavel': FaHeartPulse,
  'todas-receitas': FaKitchenSet,
  'pizzas': FaPizzaSlice,
  'paes': FaBreadSlice,
  'vegetariano': FaLeaf,
  'sobremesas-geladas': FaIceCream,
  'cafes': FaMugHot
};

const CategoryIcon = ({ 
  category,
  size = "md",
  color = "inherit"
}) => {
  const Icon = categoryIcons[category] || FaKitchenSet;
  const sizeMap = {
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "2.5rem"
  };

  return (
    <Icon 
      size={sizeMap[size]} 
      color={color}
      aria-label={category.replace('-', ' ')}
    />
  );
};

CategoryIcon.propTypes = {
  category: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  color: PropTypes.string,
};

export default CategoryIcon;