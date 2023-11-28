const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token || token === "") {
      return res.status(403).json({
        success: false,
        message: "Login first to access resources",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || !decoded._id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or has been expired, Please login again",
      });
    }

    // Check if the token has an expiration time
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("auth error", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.hasAuthorisedRoles = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: `${req.user.role} is not allowed to access this resource`,
    });
  }
  next();
};
