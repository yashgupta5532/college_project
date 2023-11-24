const express = require("express");
const User =require("../models/UserModel")
const {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserDetails,
  followUser,
  updateRole,
  getMyDetails,
  Authors,
} = require("../controllers/UserController");
const {
  isAuthenticatedUser,
  hasAuthorisedRoles,
} = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/follow/:id").post(isAuthenticatedUser,followUser)
router.route("/me").get(isAuthenticatedUser,getMyDetails);
router.route("/getAllUsers").get(isAuthenticatedUser,hasAuthorisedRoles, getAllUsers); //Admin
router.route("/:id").get(isAuthenticatedUser, getUserDetails); 
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/update-role/:id").put(isAuthenticatedUser,hasAuthorisedRoles,updateRole)
router.route("/stats/authors").get(Authors)
module.exports = router;
