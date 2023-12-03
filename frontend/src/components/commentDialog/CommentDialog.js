import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import CommentCard from "./CommentCard";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../Action/UserAction";

const CommentDialog = ({ open, onClose, onPostComment, comments }) => {
  const [comment, setComment] = useState("");
  const [commentDetails, setCommentDetails] = useState([]);
  const dispatch = useDispatch();

  const fetchUserDetails = useCallback(
    async (userId) => {
      try {
        if (!userId) {
          return null;
        }
        const response = await dispatch(getUserDetails(userId));
        if (response.success) {
          const userDetails = response?.user; 
          return userDetails;
        } else {
          console.error("Failed to fetch user details:", response.error);
          return null;
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchCommentDetails = async () => {
      if (comments && comments.length > 0) {
        const commentDetailsArray = await Promise.all(
          comments.map(async (comment) => {
            const userDetails = await fetchUserDetails(comment?.user);
            return {
              userId: comment?.user?._id,
              name: userDetails?.name,
              avatar: userDetails?.avatar.url,
              comment: comment?.comment,
              commentId: comment?._id,
            };
          })
        );
        setCommentDetails(commentDetailsArray);
      }
    };
  
    fetchCommentDetails();
  }, [comments, fetchUserDetails]);
  

  const handlePostComment = () => {
    onPostComment(comment);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { minWidth: '50vw', minHeight: '60vh' } }}>
      {commentDetails.map((commentDetail) => (
        <CommentCard key={commentDetail.commentId} {...commentDetail} />
      ))}

      <DialogTitle>Write a Comment</DialogTitle>
      <DialogContent>
        <TextField
          label="Comment"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handlePostComment}>
          Post Comment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
