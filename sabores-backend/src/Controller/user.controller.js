const User = require("../Model/user");

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    res.json({ message: error });
  }
}

async function getAnUser(req, res) {
  try {
    const userById = await User.findById(req.params.id);
    res.json(userById);
  } catch (error) {
    res.json({ message: error });
  }
}

async function createAuser(req, res) {
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
}

async function updatedUser(req, res) {
  const id = req.params.id;
  try {
    await User.findByIdAndUpdate(id, {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      dateNasc: req.body.dateNasc,
    });
    let updatedUser = await Recipe.find();
    res.json(updatedUser);
  } catch (error) {}
}

async function deleteAuser(req, res) {
  let id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.send("User successfully delected! ");
  } catch (error) {
    res.json({ message: error });
  }
}

module.exports = {
  getAllUsers,
  getAnUser,
  createAuser,
  updatedUser,
  deleteAuser
};
