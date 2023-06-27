const mongoose = require("mongoose");

require("dotenv").config();

mongoose.Promise = globaol.Promise;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});
