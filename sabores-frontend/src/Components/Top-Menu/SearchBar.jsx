import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = ({ 
  placeholder = "Procure sua receita aqui...",
  onSearch,
  onClear,
  suggestions = [],
  showFilters = true,
  autoFocus = false
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const inputRef = useRef(null);

  const filters = [
    { id: "all", label: "Tudo" },
    { id: "recipes", label: "Receitas" },
    { id: "ingredients", label: "Ingredientes" },
    { id: "categories", label: "Categorias" },
    { id: "users", label: "Usuários" }
  ];

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query, selectedFilter);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch?.(suggestion, selectedFilter);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
    if (query.trim()) {
      onSearch?.(query, filterId);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
    if (e.key === "Enter" && !e.shiftKey) {
      handleSearch(e);
    }
  };

  return (
    <div className="search-bar">
      <form 
        className={`search-bar__form ${isFocused ? 'search-bar__form--focused' : ''}`}
        onSubmit={handleSearch}
        role="search"
        aria-label="Buscar receitas"
      >
        <div className="search-bar__input-wrapper">
          <FaSearch className="search-bar__search-icon" aria-hidden="true" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
              setTimeout(() => setShowSuggestions(false), 300);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-bar__input"
            aria-label="Buscar"
            autoComplete="off"
          />
          
          {query && (
            <button
              type="button"
              className="search-bar__clear-button"
              onClick={handleClear}
              aria-label="Limpar busca"
            >
              <FaTimes aria-hidden="true" />
            </button>
          )}
        </div>

        {showFilters && (
          <div className="search-bar__filters">
            <FaFilter className="search-bar__filter-icon" aria-hidden="true" />
            <div className="search-bar__filter-buttons">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`search-bar__filter-button ${selectedFilter === filter.id ? 'search-bar__filter-button--active' : ''}`}
                  onClick={() => handleFilterChange(filter.id)}
                  aria-label={`Filtrar por ${filter.label}`}
                  aria-pressed={selectedFilter === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="search-bar__submit-button"
          aria-label="Buscar"
          disabled={!query.trim()}
        >
          <FaSearch aria-hidden="true" />
        </button>
      </form>

      {/* Sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-bar__suggestions">
          <div className="search-bar__suggestions-header">
            <span className="search-bar__suggestions-title">Sugestões</span>
            <span className="search-bar__suggestions-count">
              {suggestions.length} resultados
            </span>
          </div>
          <ul className="search-bar__suggestions-list">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <li key={index} className="search-bar__suggestion-item">
                <button
                  type="button"
                  className="search-bar__suggestion-button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label={`Buscar por ${suggestion}`}
                >
                  <FaSearch className="search-bar__suggestion-icon" />
                  <span className="search-bar__suggestion-text">{suggestion}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Histórico de buscas (se houver) */}
      {showSuggestions && query.trim() === "" && (
        <div className="search-bar__history">
          <div className="search-bar__history-header">
            <span className="search-bar__history-title">Histórico</span>
            <button 
              type="button"
              className="search-bar__history-clear"
              aria-label="Limpar histórico"
            >
              Limpar
            </button>
          </div>
          {/* Aqui você pode renderizar o histórico de buscas */}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  showFilters: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default SearchBar;