const express = require("express");
const router = express.Router();

const User = require("../modules/user");

//get all users
router.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.json({ message: error });
  }
});

//get an user
router.get("/user/:userID", async (req, res) => {
    try {
        const userById = await User.findById(req.params.userID)
        res.json(userById)
    } catch (error) {
        res.json({message: error})
    }
});

//create a user
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    dateNasc: req.body.dateNasc,
  });

  try {
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
