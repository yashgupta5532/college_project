import React, { Fragment, useEffect, useState, useCallback } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import profile from "../images/profile.png";
import { Typography } from "@mui/material";
import PixIcon from "@mui/icons-material/Pix";
import postImg from "../images/posts.png";
import likeImg from "../images/thumb-up.png";
import userImg from "../images/add-user.png";
import PostCard from "../PostRender/PostCard";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../Action/UserAction";
import { singlePost } from "../../Action/PostAction";

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await dispatch(getUserDetails(userId));
        if (userResponse.success) {
          const userData = userResponse.user;
          setUser(userData);

          // Fetch posts details
          const postDetails = await Promise.all(
            userData.posts.map(async (postId) => {
              const response = await dispatch(singlePost(postId));
              return response.post;
            })
          );
          setAllPosts(postDetails);

          // Calculate total likes and total comments
          let likesCount = 0;
          let commentsCount = 0;
          postDetails.forEach((post) => {
            likesCount += post?.likes?.length;
            commentsCount += post?.comments?.length;
          });

          setTotalLikes(likesCount);
          setTotalComments(commentsCount);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, dispatch]);


  return (
    <Fragment>
      <div className="user-info">
        <div className="user-avatar">
          <img src={user?.avatar ? user?.avatar.url : profile} alt="user-img" />
          <Typography variant="h4">{user?.name}</Typography>
        </div>
        <div className="user-details">
          <div className="college-info">
            <b>
              <Typography variant="h4">{user?.name}</Typography>
            </b>
            <div className="schooling">
              <PixIcon />
              <Typography variant="h5">{user?.myStatus}</Typography>
            </div>
            <div className="blur-text">
              <p>{user?.followers?.length} Followers</p>
              <p>{user?.following?.length} Followers</p>
            </div>
          </div>
          <div className="post-info">
            <div>
              <div className="boxes">
                <img src={postImg} alt="img" />
                <p>{user?.posts?.length}</p>
              </div>
              <p>Total posts</p>
            </div>
            <div>
              <div className="boxes">
                <img src={likeImg} alt="img" />
                <p>{totalLikes}</p>
              </div>
              <p>Total likes</p>
            </div>
            <div>
              <div className="boxes">
                <img src={userImg} alt="img" />
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
                avatar: user?.avatar?.url || profile,
                name: user?.name,
                followers: user?.followers?.length,
              }}
              post={post}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default Profile;
