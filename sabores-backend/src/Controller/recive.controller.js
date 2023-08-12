const Recipe = require("../Model/recipe");

async function createArecipe(req, res) {
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
}

async function getAllRecipes(req, res) {
  try {
    const allRecipes = await Recipe.find();
    res.json(allRecipes);
  } catch (error) {
    res.json({ message: error });
  }
}

async function getSingleRecipe(req, res) {
  try {
    const recipeById = await Recipe.findBiId(req.params.id);
    res.json(recipeById);
  } catch (error) {
    res.json({ message: error });
  }
}

async function updateRecipe(req, res) {
  const id = req.params.id;
  try {
    await Recipe.findByIdAndUpdate(id, {
      name: req.params.name,
      imageURL: req.params.imageURL,
      recipe: req.params.recipe,
      comment: req.params.comment,
      rate: req.params.rate,
    });
    let updatedRecipe = await Recipe.find();
    res.json(updatedRecipe);
  } catch (error) {
    res.json({ message: error });
  }
}

async function deleteRecipe(req, res) {
  let id = req.params.id;
  try {
    await Recipe.findByIdAndDelete(id);
    res.send("Item successfully delected! ");
  } catch (error) {
    res.json({ message: error });
  }
}

module.exports = {
  createArecipe,
  getAllRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
};
