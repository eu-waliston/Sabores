import React from "react";
import PropTypes from "prop-types";
import RecipeCard from "./RecipeCard";
import "./RecipeGrid.scss";

const RecipeGrid = ({
                        recipes = [],
                        layout = "mixed",
                        onRecipeClick,
                        loading = false,
                        emptyMessage = "Nenhuma receita encontrada."
                    }) => {
    // Dividir receitas para layout misto
    const getMixedLayoutRecipes = () => {
        if (recipes.length === 0) return { large: [], small: [] };

        // Para layout misto, primeiro 2 são grandes, resto são pequenos
        return {
            large: recipes.slice(0, 2),
            small: recipes.slice(2, 8), // Máximo 6 pequenas após as 2 grandes
            remaining: recipes.slice(8) // Restante se houver mais receitas
        };
    };

    const { large, small, remaining } = getMixedLayoutRecipes();

    const handleCardClick = (recipeId) => {
        if (onRecipeClick) {
            onRecipeClick(recipeId);
        }
    };

    if (loading) {
        return (
            <div className="recipe-grid recipe-grid--loading">
                <div className="loading-spinner"></div>
                <p>Carregando receitas...</p>
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className="recipe-grid recipe-grid--empty">
                <div className="recipe-grid__empty-message">
                    <div className="recipe-grid__empty-icon">🍳</div>
                    <h3 className="recipe-grid__empty-title">{emptyMessage}</h3>
                    <p className="recipe-grid__empty-subtitle">
                        Tente ajustar seus filtros de busca ou explore outras categorias.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="recipe-grid">
            {layout === "mixed" ? (
                <>
                    {/* Primeira linha: 2 receitas grandes (ou menos se não houver) */}
                    {large.length > 0 && (
                        <div className="recipe-grid__row">
                            {large.map((recipe) => (
                                <div key={recipe.id} className="recipe-grid__large">
                                    <RecipeCard
                                        recipe={recipe}
                                        size="large"
                                        onClick={handleCardClick}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Segunda linha: 3 receitas pequenas */}
                    {small.length > 0 && (
                        <div className="recipe-grid__row">
                            {small.map((recipe) => (
                                <div key={recipe.id} className="recipe-grid__small">
                                    <RecipeCard
                                        recipe={recipe}
                                        size="small"
                                        onClick={handleCardClick}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Terceira linha: receitas restantes em grid uniforme */}
                    {remaining.length > 0 && (
                        <div className="recipe-grid__uniform">
                            {remaining.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    size="medium"
                                    onClick={handleCardClick}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                // Layout uniforme: todas as receitas do mesmo tamanho
                <div className="recipe-grid__uniform">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            size="medium"
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
            )}

            {/* Contador de receitas */}
            <div className="recipe-grid__footer">
                <p className="recipe-grid__count">
                    Mostrando {recipes.length} receita{recipes.length !== 1 ? 's' : ''}
                    {layout === "mixed" && recipes.length > 8 && (
                        <span className="recipe-grid__more"> +{recipes.length - 8} mais</span>
                    )}
                </p>
            </div>
        </div>
    );
};

RecipeGrid.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            prepTime: PropTypes.number,
            cookTime: PropTypes.number,
            servings: PropTypes.number,
            category: PropTypes.string,
            difficulty: PropTypes.string,
        })
    ).isRequired,
    layout: PropTypes.oneOf(["mixed", "uniform"]),
    onRecipeClick: PropTypes.func,
    loading: PropTypes.bool,
    emptyMessage: PropTypes.string,
};

RecipeGrid.defaultProps = {
    layout: "mixed",
    loading: false,
    emptyMessage: "Nenhuma receita encontrada.",
};

export default RecipeGrid;