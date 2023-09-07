const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();

//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser)

//import routes here
const user = require("./routes/UserRoutes");

//using routes
app.use("/api/v1/user", user);

module.exports = app;
