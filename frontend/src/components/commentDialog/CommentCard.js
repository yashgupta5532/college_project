import React from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
}) => {

  return (
    <div className="commentUser">
      <Link to={`/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography className="name">{name}</Typography>
        <Typography className="comment" style={{ fontWeight: "900" }}>
          {comment}
        </Typography>
      </Link>
    </div>
  );
};

export default CommentCard;
