require("dotenv").config();

const User = require("../Model/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  if (password.length < 0) {
    return res.status(400).json({
      message: "Password less than 6 characters",
    });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: maxAge,
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({
          message: "User successfully created",
          user,
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successfully created",
          error: error.message,
        })
      );
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  //check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }

  try {
    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: maxAge,
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        res.status(201).json({
          message: "User succcessfully Logged in",
          user: user._id,
        });
      } else {
        res.status(400).json({
          message: "Login not successful :( ",
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      message: "An error occurred",
      e: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;

  //First - Verifying if role and id is present
  if (role && id) {
    if (role === "admin") {
      try {
        res.status(400).json({ message: "Role is Admin" });
      } catch (error) {
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message });
      }
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }

    if (user.role !== "admin") {
      user.role = role;
      user.save((err) => {
        //MongoDB error checker
        if (err) {
          res
            .status("400")
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status("201").json({ message: "Update successfull", user });
      });
    } else {
      res.status(400).json({ message: "User is already  an Admin" });
    }
  } else {
    res.status(400).json({
      message: "Role or Id not present",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  try {
    await User.findByIdAndDelete(id).then((user) => {
      res.status(201).json({ message: "User successfully deleted", user });
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
