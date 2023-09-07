const express = require("express");
const { registerUser, loginUser, logoutUser, updatePassword, updateProfile, forgotPassword } = require("../controllers/UserController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/profile/update').put(updateProfile)
router.route('/password/forgot').post(forgotPassword)
module.exports = router;
