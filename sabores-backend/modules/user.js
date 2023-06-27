const mongoose = require("mongoose");

const User = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateNasc: { type: Date, required: true },
});

module.exports = mongoose.model("User", User);
