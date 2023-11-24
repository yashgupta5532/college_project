const express = require("express");
const {
  createPost,
  likeDislike,
  commentOnPost,
  updatePost,
  deletePost,
  PendingPosts,
  RejectPost,
  ApprovePost,
  DeletePostAdmin,
  getAllPosts,
  getSinglePost,
  getMyPosts,
  SearchPost,
} = require("../controllers/PostController");
const {
  isAuthenticatedUser,
  hasAuthorisedRoles,
} = require("../middlewares/auth");

const router = express.Router();

router.route("/createPost").post(isAuthenticatedUser, createPost);
router.route("/myposts").get(isAuthenticatedUser, getMyPosts);
router.route("/all-posts").get(isAuthenticatedUser, getAllPosts);
router.route("/:id").get(isAuthenticatedUser, getSinglePost);
router.route("/like-dislike/:id").post(isAuthenticatedUser, likeDislike);
router.route("/comment/:id").post(isAuthenticatedUser, commentOnPost);
router.route("/update-post/:id").put(isAuthenticatedUser, updatePost);
router.route("/delete/:id").delete(isAuthenticatedUser, deletePost);
router.route("/search/:keyword").get(SearchPost);
router
  .route("/pending")
  .get(isAuthenticatedUser, hasAuthorisedRoles, PendingPosts);
router
  .route("/reject/:id")
  .put(isAuthenticatedUser, hasAuthorisedRoles, RejectPost);
router
  .route("/approve/:id")
  .put(isAuthenticatedUser, hasAuthorisedRoles, ApprovePost);
router
  .route("/delete-admin/:id")
  .delete(isAuthenticatedUser, hasAuthorisedRoles, DeletePostAdmin);

module.exports = router;
