import React, { useState, useEffect } from "react";
import FeedBanner from "./FeedBanner";
import RecipeGrid from "./RecipeGrid";
import "./Feed.scss";

// Dados mockados - serão substituídos pela API
const MOCK_RECIPES = [
  {
    id: 1,
    name: "Pavê de banana",
    image: "/images/home-receita-g-1.webp",
    prepTime: 240, // 4 horas em minutos
    cookTime: 60,  // 1 hora em minutos
    servings: 8,
    category: "Sobremesa",
    difficulty: "Médio"
  },
  {
    id: 2,
    name: "Filé mignon na cerveja",
    image: "/images/home-receita-g-2.webp",
    prepTime: 120,
    cookTime: 60,
    servings: 6,
    category: "Prato Principal",
    difficulty: "Fácil"
  },
  {
    id: 3,
    name: "Frango assado com geleia de pimenta",
    image: "/images/home-receita-p-1.webp",
    prepTime: 30,
    cookTime: 60,
    servings: 4,
    category: "Aves",
    difficulty: "Fácil"
  },
  {
    id: 4,
    name: "Filé de frango ao molho de pistache",
    image: "/images/home-receita-p-2.webp",
    prepTime: 30,
    cookTime: 30,
    servings: 6,
    category: "Aves",
    difficulty: "Médio"
  },
  {
    id: 5,
    name: "Frango frito crocante",
    image: "/images/home-receita-p-3.jpg",
    prepTime: 20,
    cookTime: 20,
    servings: 12,
    category: "Aves",
    difficulty: "Fácil"
  },
  {
    id: 6,
    name: "Cookie de chocolate diet",
    image: "/images/home-receita-g-3.jpeg",
    prepTime: 10,
    cookTime: 0,
    servings: 35,
    category: "Doces",
    difficulty: "Fácil"
  },
  {
    id: 7,
    name: "Mousse de maracujá",
    image: "/images/home-receita-g-4.jpg",
    prepTime: 20,
    cookTime: 0,
    servings: 1,
    category: "Sobremesa",
    difficulty: "Fácil"
  },
  {
    id: 8,
    name: "Brownie de batata doce",
    image: "/images/home-receita-p-4.jpg",
    prepTime: 20,
    cookTime: 40,
    servings: 8,
    category: "Doces",
    difficulty: "Médio"
  },
  {
    id: 9,
    name: "Bolo de banana com bolacha cream cracker",
    image: "/images/home-receita-p-5.jpg",
    prepTime: 30,
    cookTime: 30,
    servings: 10,
    category: "Bolos",
    difficulty: "Médio"
  },
  {
    id: 10,
    name: "Bolo de chocolate sem glúten, leite ou açúcar",
    image: "/images/home-receita-p-6.jpg",
    prepTime: 20,
    cookTime: 20,
    servings: 8,
    category: "Bolos",
    difficulty: "Difícil"
  },
    {
    id: 11,
    name: "Brownie de batata doce",
    image: "/images/home-receita-p-4.jpg",
    prepTime: 20,
    cookTime: 40,
    servings: 8,
    category: "Doces",
    difficulty: "Médio"
  },
    {
    id: 12,
    name: "Brownie de batata doce",
    image: "/images/home-receita-p-4.jpg",
    prepTime: 20,
    cookTime: 40,
    servings: 8,
    category: "Doces",
    difficulty: "Médio"
  }
];

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("mixed");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      // TODO: Substituir pela chamada real à API
      // const response = await api.get('/recipes', { params: { page } });
      // const newRecipes = response.data.recipes;

      // Usando dados mockados por enquanto
      setTimeout(() => {
        setRecipes(MOCK_RECIPES);
        setHasMore(false); // Mock data tem apenas 10 itens
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipeId) => {
    // TODO: Navegar para a página da receita
    console.log("Receita clicada:", recipeId);
    // history.push(`/recipe/${recipeId}`);
    // Ou usar navigate se estiver usando react-router v6
    // navigate(`/receita/${recipeId}`);
  };

  const handleLayoutToggle = (newLayout) => {
    setLayout(newLayout);
  };

  const handleLoadMore = () => {
    // TODO: Carregar mais receitas da API
    setPage(prevPage => prevPage + 1);
    console.log("Carregando mais receitas... página:", page + 1);

    // Mock de carregar mais
    setTimeout(() => {
      // Simulando que não há mais receitas após a primeira página
      setHasMore(false);
      alert("Todas as receitas já foram carregadas!");
    }, 1000);
  };

  if (loading && recipes.length === 0) {
    return (
        <div className="feed__loading">
          <div className="loading-spinner"></div>
          <p>Carregando receitas...</p>
        </div>
    );
  }

  return (
      <div className="feed" id="feed">
        <FeedBanner />

        <div className="feed__controls">
          <div className="feed__layout-toggle">
            <button
                className={`feed__layout-button ${layout === "mixed" ? 'active' : ''}`}
                onClick={() => handleLayoutToggle("mixed")}
                aria-label="Layout misto"
                disabled={loading}
            >
              Misto
            </button>
            <button
                className={`feed__layout-button ${layout === "uniform" ? 'active' : ''}`}
                onClick={() => handleLayoutToggle("uniform")}
                aria-label="Layout uniforme"
                disabled={loading}
            >
              Uniforme
            </button>
          </div>

          <div className="feed__stats">
          <span className="feed__count">
            {recipes.length} receita{recipes.length !== 1 ? 's' : ''} disponível{recipes.length !== 1 ? 'is' : ''}
          </span>
          </div>
        </div>

        <div className="feed__content">
          <RecipeGrid
              recipes={recipes}
              layout={layout}
              onRecipeClick={handleRecipeClick}
              loading={loading && recipes.length === 0}
              emptyMessage="Nenhuma receita encontrada para os filtros selecionados."
          />
        </div>

        {hasMore && recipes.length > 0 && (
            <div className="feed__footer">
              <button
                  className="feed__more-button"
                  onClick={handleLoadMore}
                  disabled={loading}
                  aria-label="Carregar mais receitas"
              >
                {loading ? (
                    <>
                      <span className="feed__spinner" aria-hidden="true"></span>
                      Carregando...
                    </>
                ) : (
                    "Carregar mais receitas"
                )}
              </button>
              <p className="feed__footer-text">
                Mostrando {recipes.length} de 312 receitas disponíveis
              </p>
            </div>
        )}

        {!hasMore && recipes.length > 0 && (
            <div className="feed__end">
              <div className="feed__end-icon">🎉</div>
              <h3 className="feed__end-title">Você viu todas as receitas!</h3>
              <p className="feed__end-message">
                Explore outras categorias ou tente uma busca diferente.
              </p>
              <button
                  className="feed__end-button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Voltar ao topo
              </button>
            </div>
        )}
      </div>
  );
};

export default Feed;