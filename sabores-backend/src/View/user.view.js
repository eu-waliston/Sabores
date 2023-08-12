const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAnUser,
  createAuser,
  deleteAuser,
  updatedUser,
} = require("../Controller/user.controller");

router.get("/users", getAllUsers);

router.get("/user/:id", getAnUser);

router.post("/register", createAuser);

router.put("/users/:id", updatedUser);

router.delete("/user/:id", deleteAuser);

module.exports = router;
