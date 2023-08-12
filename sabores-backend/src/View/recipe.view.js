const express = require("express");
const router = express.Router();

const { register, login, update, deleteUser } = require("../Guard/Auth");

const { adminAuth, userAuth } = require("../Auth/Auth");

const {
  createArecipe,
  getAllRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../Controller/recive.controller");

router.post("/recipe", createArecipe, userAuth, adminAuth);

router.get("/recipes", getAllRecipes, userAuth, adminAuth);

router.get("/recipes/:id", getSingleRecipe, userAuth, adminAuth);

router.patch("/recipes/:id", updateRecipe, userAuth, adminAuth);

router.delete("/recipe/:id", deleteRecipe, adminAuth);

module.exports = router;
