const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token || token === "") {
      return res.status(404).json({
        success: false,
        message: "Login first to access resources",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
