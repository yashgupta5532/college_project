const app = require("./app");
const cloudinary = require("cloudinary");
const { connectDatabase } = require("./config/db");

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

//uncaughtException
process.on("uncaughtException",(err)=>{
  console.log("handled uncaughtException (undefined)",err.message);
  console.log('shutting down the server due to uncaught exception');
  server.close(()=>{
    process.exit(1);
  })
})

connectDatabase();
const server=app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});

//unhandledRejection error like mongodb uri invalid string

process.on("unhandledRejection",(err)=>{
  console.log(err.message);
  console.log('shutting down the server due to unhandled Promise Rejection');
  server.close(()=>{
    process.exit(1);
  })
})

