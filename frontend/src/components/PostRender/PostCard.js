import React, { Fragment, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Link } from "react-router-dom";
import profile from "../images/profile.png";
import postImg from "../images/posts.png";
import "./PostCard.css";
import {
  commentOnPost,
  likeDislikePost,
  singlePost,
} from "../../Action/PostAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import CommentDialog from "../commentDialog/CommentDialog";

const PostCard = ({ user, post }) => {
  const { userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(null);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const alert = useAlert();

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    dispatch(singlePost(post._id));
  }, [post._id]);

  const handleLike = async () => {
    try {
      await dispatch(likeDislikePost(post?._id));
  
      const response= await dispatch(singlePost(post._id));
  
      setUpdatedPost(response.post);
  
      // Toggle the like state
      setIsLiked(!isLiked);
  
      // Show a success message
      alert.success(isLiked ? "Post Liked" : "Post Disliked");
    } catch (error) {
      alert.error("Failed to like/dislike post");
    }
  };
  

  const handleOpenCommentDialog = () => {
    setIsCommentDialogOpen(true);
  };

  const handleCloseCommentDialog = () => {
    setIsCommentDialogOpen(false);
  };

  const handlePostComment = async (comment) => {
    try {
      await dispatch(commentOnPost(comment, post._id));
      const response =await dispatch(singlePost(post._id));
      setUpdatedPost(response.post);
      alert.success("Commented on post");
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
          <Link to={`/profile/${user.userId}`}>
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
                <div className={`status ${post?.status}`}>{post?.status}</div>
              )}
            </div>
          </Link>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostCard;
