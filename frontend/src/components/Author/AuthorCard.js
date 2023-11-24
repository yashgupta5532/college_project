import React, { Fragment } from "react";
import profile from "../images/profile.png";
import { Link } from "react-router-dom";
import "./AuthorCard.css";

const AuthorCard = ({ author }) => {
  return (
    <Fragment>
      <div className="author-container">
        <Link to={`/${author._id}`}>
          <div className="author-image-container">
            <img
              src={author.avatarUrl ? author.avatarUrl : profile}
              alt="profile-pic"
              className="author-image"
            />
            <p className="author-name">{author.name}</p>
          </div>
          <div className="authors-followers-container">
            <div className="follower-post">
              <p style={{ fontWeight: "bolder" }}>{author.postCount}</p>
              <p>Posts</p>
            </div>
            <div className="vertical-line"></div>
            <div className="follower-post">
              <p style={{ fontWeight: "bolder" }}>{author.followers}</p>
              <p>Followers</p>
            </div>
          </div>
          <div className="status">
            <p>
              {" "}
              {author.myStatus}
            </p>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default AuthorCard;
