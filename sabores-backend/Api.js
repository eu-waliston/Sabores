const express = require("express");
const cors = require("cors");
const helmte = require("helmet");

require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmte());

//routes
const rootRouter = require("./routes/root.router");
const userRouter = require("./routes/user.router");
const recipeRouter = require("./routes/recipe.router");

app.use("/", rootRouter);
app.use("/", userRouter);
app.use("/", recipeRouter);

//DB Connection
require("./config/DB");

//Server
app.listen(process.env.PORT, () => {
  console.log(`Api Listening on PORT ${process.env.PORT}`);
});
