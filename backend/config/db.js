const mongoose = require("mongoose");

exports.connectDatabase = async (req, res) => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(
        `mongodb connected to ${mongoose.connection.host} successfully`
      );
    }).catch((err)=>{
      console.log('Error while connecting mongodb')
    })
};
