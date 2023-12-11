const mongoose = require("mongoose");

exports.connectDatabase = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB connected to ${mongoose.connection.host} successfully`
    );
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
  }
};
