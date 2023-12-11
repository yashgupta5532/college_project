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
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "sessionId"],
    exposedHeaders: ["sessionId"],
    credentials: true,
    preflightContinue: false,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//import routes here
const user = require("./routes/UserRoutes");
const post = require("./routes/PostRoutes");
const contact = require("./routes/ContactRoutes");

//using routes
app.use("/api/v1/user", user);
app.use("/api/v1/post", post);
app.use("/api/v1/contact", contact);

module.exports = app;
