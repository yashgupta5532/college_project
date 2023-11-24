const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

const app = express();

//using middlewares
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//import routes here
const user = require("./routes/UserRoutes");
const post = require("./routes/PostRoutes");

//using routes
app.use("/api/v1/user", user);
app.use("/api/v1/post", post);
module.exports = app;
