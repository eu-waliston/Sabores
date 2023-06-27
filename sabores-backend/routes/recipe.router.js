const express = require("express");
const router = express.Router();

const Recipe = require("../modules/recipe");

//create a recipe
router.post("/recipe", async (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name,
    imageURL: req.body.imageURL,
    recipe: req.body.recipe,
    comment: req.body.comment,
    rate: req.body.rate,
  });

  try {
    const createRecipe = await newRecipe.save();
    res.json(createRecipe);
  } catch (error) {
    res.json({ message: error });
  }
});

//get all recipes
router.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.json(allRecipes);
  } catch (error) {
    res.json({ message: error });
  }
});

//get an recipe
router.get("/recipes/:recipesID", async (req, res) => {
  try {
    const recipesByID = await Recipe.findById(req.params.recipesID);
    res.json(recipesByID);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
