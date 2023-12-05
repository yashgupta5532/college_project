import React, { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import profile from "../images/profile.png";
import postImg from "../images/posts.png";
import "./PostCard.css";
import {
  commentOnPost,
  deleteUserOwnPost,
  likeDislikePost,
  singlePost,
} from "../../Action/PostAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import CommentDialog from "../commentDialog/CommentDialog";
import UpdatePostDialog from "../Post/UpdatePostDialog";

const PostCard = ({ user, post }) => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isEditPostDialogOpen,setIsEditPostDialogOpen]=useState(false);
  // const [updatedPost, setUpdatedPost] = useState();
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const alert = useAlert();
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleLike = async () => {
    try {
      const response = await dispatch(likeDislikePost(post?._id));
      if (response.success) {
        setIsLiked(!isLiked);
        alert.success(response.message);
      }
      // const response = await dispatch(singlePost(post._id));
      // setUpdatedPost(response.post);
    } catch (error) {
      alert.error("Failed to like/dislike post");
    }
  };
  const handleDeltePost = async () => {
    try {
      const response = await dispatch(deleteUserOwnPost(post._id));
      if (response.success) {
        alert.success(response.message);
      }
    } catch (error) {
      alert.error("Error while deleting post");
    }
  };

  const handleOpenEditPostDialog = () => {
    setIsEditPostDialogOpen(true);
  };

  const handleCloseEditPostDialog =()=>{
    setIsEditPostDialogOpen(false);
  }


  const handleOpenCommentDialog = () => {
    setIsCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setIsCommentDialogOpen(false);
  };

  const handlePostComment = async (comment) => {
    try {
      const response = await dispatch(commentOnPost(comment, post._id));
      if (response.success) {
        alert.success(response.message);
      }
    } catch (error) {
      alert.error("Failed to post comment");
    }
  };
  if (!user || !user.userId) {
    return null;
  }

  return (
    <Fragment>
      <div className="card-container">
        <div className="user-post-container">
          {/* <Link to={`/profile/${user.userId}`}> */}
            <div className="user-post-header">
              <div className="user-avatar">
                <img src={user?.avatar || profile} alt="user" />
              </div>
              <div className="user-name">
                <Typography variant="h6">
                  <b>{user?.name}</b>
                </Typography>
                <div>
                  <p>{user?.followers} Followers</p>
                  <p style={{ marginLeft: "5px" }}>
                    {post?.createdAt ? formatDate(post?.createdAt) : ""}
                  </p>
                </div>
              </div>
              {user?.userId === userId && (
                <>
                  <div className={`status ${post?.status}`}>{post?.status}</div>
                  <div className="delete-post" onClick={handleDeltePost}>
                    <DeleteIcon />
                  </div>
                  <div className="update-post" onClick={handleOpenEditPostDialog}>
                    <EditIcon />
                  </div>
                </>
              )}
            </div>
          {/* </Link> */}
          <div className="posts-container">
            <div className="d-post">
              <div className="images">
                {post?.images ? (
                  post?.images.map((image, index) => (
                    <img key={index} src={image.url} alt={`${index}`} />
                  ))
                ) : (
                  <img src={postImg} alt={`default`} />
                )}
              </div>
              <div className="post-description">
                <Typography variant="h5">
                  {post?.title ? post.title : "No title"}
                </Typography>
                <p>{post?.description}</p>
              </div>
            </div>
            <div className="post-like-comment">
              <div
                className={`post likes ${isLiked ? "liked" : ""}`}
                onClick={handleLike}
              >
                {isLiked ? (
                  <ThumbUpIcon style={{ color: "blue" }} />
                ) : (
                  <ThumbUpIcon />
                )}
                <span>{post?.likes ? post.likes.length : 0}</span>
              </div>
              <div className="post comments" onClick={handleOpenCommentDialog}>
                <CommentIcon />
                <span>{post?.comments ? post.comments.length : 0}</span>
              </div>
              <div className="post seen">
                <ShareIcon />
              </div>
            </div>
            <CommentDialog
              open={isCommentDialogOpen}
              onClose={handleCloseCommentDialog}
              onPostComment={handlePostComment}
              comments={post?.comments}
            />
            <UpdatePostDialog
              open={isEditPostDialogOpen}
              onClose={handleCloseEditPostDialog}
              postId={post?._id}
              image={post?.images[0].url}
              title={post?.title}
              description={post?.description}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostCard;
