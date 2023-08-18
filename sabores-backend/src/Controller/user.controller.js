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
    role: req.body.role,
  });

  try {
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (error) {
    res.json({ message: error });
  }
}

async function updatedUser(req, res) {
  try {
    await Recipe.updateOne(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          dateNasc: req.body.dateNasc,
        },
      }
    );

    let updated = Recipe.findById(req.body.id);
    res.status(200).json(updated);
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

async function loginWithUser(req, res) {
  let username = req.body.username;

  const UserP = User.findOne({
    username: req.body.username,
  });

  try {
    if (username === UserP) {
      res.redirect("/");
    }
  } catch (error) {
    res.json({ message: error });
  }
}

module.exports = {
  getAllUsers,
  getAnUser,
  createAuser,
  updatedUser,
  deleteAuser,
  loginWithUser,
};
