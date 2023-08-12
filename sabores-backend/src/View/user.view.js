const express = require("express");
const router = express.Router();

const { register, login, update, deleteUser } = require("../Guard/Auth");

const { adminAuth, userAuth } = require("../Auth/Auth");

const {
  getAllUsers,
  getAnUser,
  createAuser,
  deleteAuser,
  updatedUser,
  loginWithUser,
} = require("../Controller/user.controller");

router.get("/users", getAllUsers);

router.get("/user/:id", getAnUser);

router.post("/users/register", createAuser, register);

router.post("/users/login", loginWithUser, login, userAuth);

router.put("/users/:id", updatedUser, update);

router.delete("/user/:id", deleteAuser, deleteUser, adminAuth);

module.exports = router;
