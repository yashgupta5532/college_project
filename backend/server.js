const app = require("./app");
const cloudinary = require("cloudinary");
const { connectDatabase } = require("./config/db");

//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// cloudinary.api.resources(function(result) {
//   console.log(result.resources);
// });

connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});

