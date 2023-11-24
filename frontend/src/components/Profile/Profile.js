import React, { Fragment, useEffect, useState } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import profile from "../images/profile.png";
import { Typography } from "@mui/material";
import PixIcon from "@mui/icons-material/Pix";
import post from "../images/posts.png";
import likes from "../images/thumb-up.png";
import users from "../images/add-user.png";
import PostCard from "../PostRender/PostCard";

const Profile = () => {
  const { userId, avatar, name, myStatus, posts, followers, following } =
    useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (posts && Array.isArray(posts)) {
        let likesCount = 0;
        let commentsCount = 0;

        const postDetails = await Promise.all(
          posts.map(async (postId) => {
            const response = await fetch(`/api/v1/post/${postId}`);
            const data = await response.json();
            likesCount += data.post.likes.length;
            commentsCount += data.post.comments.length;
            return data;
          })
        );

        setTotalLikes(likesCount);
        setTotalComments(commentsCount);
        setAllPosts(postDetails);
      }
    };

    fetchPostDetails();
  }, [posts, setAllPosts]);

  return (
    <Fragment>
      <div className="user-info">
        <div className="user-avatar">
          <img src={avatar ? avatar.url : profile} alt="user-img" />
          <Typography variant="h4">{name}</Typography>
        </div>
        <div className="user-details">
          <div className="college-info">
            <b>
              <Typography variant="h4">{name}</Typography>
            </b>
            <div className="schooling">
              <PixIcon />
              <Typography variant="h5">{myStatus}</Typography>
            </div>
            <div className="blur-text">
              <p>{followers ? followers.length : 0} Followers</p>
              <p>{following ? following.length : 0} Follwers</p>
            </div>
          </div>
          <div className="post-info">
            <div>
              <div className="boxes">
                <img src={post} alt="img" />
                <p>{posts ? posts.length : 0}</p>
              </div>
              <p>Total posts</p>
            </div>
            <div>
              <div className="boxes">
                <img src={likes} alt="img" />
                <p>{totalLikes}</p>
              </div>
              <p>Total likes</p>
            </div>
            <div>
              <div className="boxes">
                <img src={users} alt="img" />
                <p>{totalComments}</p>
              </div>
              <p>Total comments</p>
            </div>
          </div>
        </div>
      </div>
      <div className="user-posts">
        {allPosts &&
          allPosts.map((post) => (
            <PostCard
              key={post._id}
              user={{
                userId,
                avatar: avatar.url,
                name,
                followers: followers.length,
              }}
              post={post.post}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default Profile;
