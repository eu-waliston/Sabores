const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { recipeValidators, validate } = require("../middleware/recipe.validator");
const upload = require("../middleware/upload.middleware");

// ======================
// ROTAS PÚBLICAS
// ======================

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Recipe API",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Listar todas receitas (com paginação e filtros)
router.get("/", recipeController.getAllRecipes);

// Buscar receita por ID
router.get("/:id", 
  validate(recipeValidators.idParam),
  recipeController.getRecipeById
);

// Buscar receitas por categoria
router.get("/category/:category", recipeController.getRecipesByCategory);

// Buscar receitas por tags
router.get("/tag/:tag", recipeController.getRecipesByTag);

// Buscar receitas populares
router.get("/popular/top", recipeController.getTopRated);

// Buscar receitas recentes
router.get("/recent/:limit?", recipeController.getRecentRecipes);

// Buscar por texto
router.get("/search/:query", recipeController.searchRecipes);

// ======================
// ROTAS PROTEGIDAS (Autenticadas)
// ======================

// Middleware de autenticação aplicado a todas as rotas abaixo
router.use(authMiddleware.authenticate);

// Criar nova receita
router.post("/",
  upload.single("image"), // Upload de imagem
  validate(recipeValidators.create),
  recipeController.createRecipe
);

// Atualizar receita (dono ou admin)
router.put("/:id",
  authMiddleware.authorizeRecipeOwnership,
  upload.single("image"),
  validate(recipeValidators.update),
  recipeController.updateRecipe
);

// Deletar receita (dono ou admin)
router.delete("/:id",
  authMiddleware.authorizeRecipeOwnership,
  validate(recipeValidators.idParam),
  recipeController.deleteRecipe
);

// Adicionar/atualizar rating
router.post("/:id/rate",
  validate(recipeValidators.rate),
  recipeController.rateRecipe
);

// Adicionar comentário
router.post("/:id/comment",
  validate(recipeValidators.comment),
  recipeController.addComment
);

// Remover comentário
router.delete("/:id/comment/:commentId",
  validate(recipeValidators.commentId),
  recipeController.removeComment
);

// Salvar receita (favoritar)
router.post("/:id/save",
  validate(recipeValidators.idParam),
  recipeController.saveRecipe
);

// Remover dos salvos
router.delete("/:id/save",
  validate(recipeValidators.idParam),
  recipeController.unsaveRecipe
);

// Incrementar visualizações
router.post("/:id/view",
  validate(recipeValidators.idParam),
  recipeController.incrementViews
);

// ======================
// ROTAS ADMIN
// ======================
router.use(authMiddleware.authorize("admin", "moderator"));

// Listar todas receitas (incluindo não publicadas)
router.get("/admin/all",
  recipeController.getAllRecipesAdmin
);

// Publicar/despublicar receita
router.patch("/:id/publish",
  validate(recipeValidators.publish),
  recipeController.togglePublish
);

// Estatísticas
router.get("/admin/stats",
  recipeController.getRecipeStats
);

// Exportar receitas (CSV/JSON)
router.get("/admin/export/:format",
  recipeController.exportRecipes
);

// Versão da API
const apiRouter = express.Router();
apiRouter.use("/v1/recipes", router);

module.exports = apiRouter;