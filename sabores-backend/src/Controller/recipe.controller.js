const Recipe = require("../Model/recipe");
const { validationResult } = require('express-validator'); // Se estiver usando validação

// Serviços de resposta padronizados
const responseService = {
  success: (res, data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data
    });
  },

  error: (res, error, message = "An error occurred", statusCode = 500) => {
    console.error("Controller Error:", error);
    res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  },

  notFound: (res, resource = "Recipe") => {
    res.status(404).json({
      success: false,
      message: `${resource} not found`
    });
  }
};

class RecipeController {
  // CREATE - Criar nova receita
  async createRecipe(req, res) {
    try {
      // Validação (opcional - pode usar express-validator)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { name, imageURL, recipe, comment, rate } = req.body;

      // Criar nova receita
      const newRecipe = new Recipe({
        name,
        imageURL,
        recipe,
        comment,
        rate: rate || 0, // Valor padrão
        createdBy: req.user?.id, // Se tiver autenticação
        createdAt: new Date()
      });

      const savedRecipe = await newRecipe.save();
      
      responseService.success(
        res, 
        savedRecipe, 
        "Recipe created successfully", 
        201
      );

    } catch (error) {
      responseService.error(res, error, "Failed to create recipe");
    }
  }

  // READ - Listar todas receitas
  async getAllRecipes(req, res) {
    try {
      // Opções de paginação e filtro
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Filtros opcionais
      const filter = {};
      if (req.query.name) {
        filter.name = { $regex: req.query.name, $options: 'i' };
      }
      if (req.query.minRate) {
        filter.rate = { $gte: parseInt(req.query.minRate) };
      }

      // Buscar com paginação
      const [recipes, total] = await Promise.all([
        Recipe.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .select('-__v'), // Excluir campos desnecessários
        Recipe.countDocuments(filter)
      ]);

      responseService.success(res, {
        recipes,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      });

    } catch (error) {
      responseService.error(res, error, "Failed to fetch recipes");
    }
  }

  // READ - Buscar receita por ID
  async getRecipeById(req, res) {
    try {
      const { id } = req.params;

      // Validar ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return responseService.error(res, null, "Invalid recipe ID", 400);
      }

      const recipe = await Recipe.findById(id).select('-__v');

      if (!recipe) {
        return responseService.notFound(res);
      }

      responseService.success(res, recipe);

    } catch (error) {
      responseService.error(res, error, "Failed to fetch recipe");
    }
  }

  // UPDATE - Atualizar receita
  async updateRecipe(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Validar ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return responseService.error(res, null, "Invalid recipe ID", 400);
      }

      // Verificar se a receita existe
      const existingRecipe = await Recipe.findById(id);
      if (!existingRecipe) {
        return responseService.notFound(res);
      }

      // Atualizar apenas campos permitidos
      const allowedUpdates = ['name', 'imageURL', 'recipe', 'comment', 'rate'];
      const updates = {};
      
      Object.keys(updateData).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = updateData[key];
        }
      });

      updates.updatedAt = new Date();

      // Atualizar
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { $set: updates },
        { 
          new: true, // Retorna o documento atualizado
          runValidators: true // Executa validações do schema
        }
      ).select('-__v');

      responseService.success(res, updatedRecipe, "Recipe updated successfully");

    } catch (error) {
      responseService.error(res, error, "Failed to update recipe");
    }
  }

  // DELETE - Remover receita
  async deleteRecipe(req, res) {
    try {
      const { id } = req.params;

      // Validar ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return responseService.error(res, null, "Invalid recipe ID", 400);
      }

      const recipe = await Recipe.findByIdAndDelete(id);

      if (!recipe) {
        return responseService.notFound(res);
      }

      responseService.success(res, null, "Recipe deleted successfully");

    } catch (error) {
      responseService.error(res, error, "Failed to delete recipe");
    }
  }

  // BONUS: Buscar receitas por rating
  async getTopRated(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      
      const topRecipes = await Recipe.find()
        .sort({ rate: -1 })
        .limit(limit)
        .select('name imageURL rate');

      responseService.success(res, topRecipes);

    } catch (error) {
      responseService.error(res, error, "Failed to fetch top recipes");
    }
  }

  // BONUS: Pesquisa por texto
  async searchRecipes(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return responseService.error(res, null, "Search query is required", 400);
      }

      const recipes = await Recipe.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { recipe: { $regex: q, $options: 'i' } },
          { comment: { $regex: q, $options: 'i' } }
        ]
      }).select('name imageURL rate');

      responseService.success(res, recipes);

    } catch (error) {
      responseService.error(res, error, "Search failed");
    }
  }
}

// Versão alternativa mais simples (se preferir função pura)
module.exports = new RecipeController();

// Ou exportar individualmente:
/*
module.exports = {
  createRecipe: (req, res) => new RecipeController().createRecipe(req, res),
  getAllRecipes: (req, res) => new RecipeController().getAllRecipes(req, res),
  getRecipeById: (req, res) => new RecipeController().getRecipeById(req, res),
  updateRecipe: (req, res) => new RecipeController().updateRecipe(req, res),
  deleteRecipe: (req, res) => new RecipeController().deleteRecipe(req, res),
  getTopRated: (req, res) => new RecipeController().getTopRated(req, res),
  searchRecipes: (req, res) => new RecipeController().searchRecipes(req, res)
};
*/