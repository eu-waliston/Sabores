const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.adminAuth = (req, res, next) => {
  const token = req.body.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (err) {
        return res.tatus(401).json({ message: "Not authorized" });
      } else {
        if (decodeToken.role !== "admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodeToken.role !== "Basic") {
          return res.status(401).json({ message: "Not authorized" });
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
