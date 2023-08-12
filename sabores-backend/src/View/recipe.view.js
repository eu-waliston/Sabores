const express = require("express");
const router = express.Router();

const {
  createArecipe,
  getAllRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../Controller/recive.controller");

router.post("/recipe", createArecipe);

router.get("/recipes", getAllRecipes);

router.get("/recipes/:id", getSingleRecipe);

router.patch("/recipes/:id", updateRecipe);

router.delete("/recipe/:id", deleteRecipe);


module.exports = router;
