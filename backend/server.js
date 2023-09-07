// const mongoose =require('mongoose')
const app = require("./app");
const { connectDatabase } = require("./config/db");

connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});

connectDatabase();
