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
  }
];

const Feed = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("mixed");

  useEffect(() => {
    // Simulando chamada à API
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // TODO: Substituir pela chamada real à API
        // const response = await api.get('/recipes');
        // setRecipes(response.data);
        
        // Usando dados mockados por enquanto
        setTimeout(() => {
          setRecipes(MOCK_RECIPES);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipeId) => {
    // TODO: Navegar para a página da receita
    console.log("Receita clicada:", recipeId);
    // history.push(`/recipe/${recipeId}`);
  };

  const handleLayoutToggle = () => {
    setLayout(layout === "mixed" ? "uniform" : "mixed");
  };

  if (loading) {
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
            onClick={() => setLayout("mixed")}
            aria-label="Layout misto"
          >
            Misto
          </button>
          <button 
            className={`feed__layout-button ${layout === "uniform" ? 'active' : ''}`}
            onClick={() => setLayout("uniform")}
            aria-label="Layout uniforme"
          >
            Uniforme
          </button>
        </div>
        
        <div className="feed__stats">
          <span className="feed__count">
            {recipes.length} receitas disponíveis
          </span>
        </div>
      </div>

      <div className="feed__content">
        <RecipeGrid 
          recipes={recipes}
          layout={layout}
          onRecipeClick={handleRecipeClick}
        />
      </div>

      <div className="feed__footer">
        <p className="feed__footer-text">
          Não encontrou o que procurava? Use nossa busca avançada!
        </p>
        <button className="feed__more-button">
          Carregar mais receitas
        </button>
      </div>
    </div>
  );
};

export default Feed;