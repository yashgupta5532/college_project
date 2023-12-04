import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import PostCard from "./PostCard";
import { useAlert } from "react-alert";
import { allPosts } from "../../Action/PostAction";
import { getUserDetails } from "../../Action/UserAction";

const RenderAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const fetchData = async () => {
      try {
        const response = await dispatch(allPosts());
        if (response.success) {
          const fetchedPosts = response?.posts;
          const appovedPosts = fetchedPosts.filter(
            (post) => post.status === "Approved"
          );
          // Fetch user details for each post owner
          const userDetailsPromises = appovedPosts.map((post) =>
            fetchUserDetails(post?.owner)
          );

          const userDetailsArray = await Promise.all(userDetailsPromises);

          // Map the user details to the respective posts
          const postsWithUserDetails = appovedPosts.map((post, index) => ({
            ...post,
            user: userDetailsArray[index],
          }));

          setPosts(postsWithUserDetails);
        }
      } catch (error) {
        console.error("Error fetching all posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, fetchUserDetails]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="renderAllPost">
          {(posts && posts.length>0) ? (
            posts.map((post) => (
              <PostCard
                key={post._id}
                user={{
                  userId: post.user?._id,
                  avatar: post.user?.avatar?.url,
                  name: post.user?.name,
                  followers: post.user?.followers?.length,
                }}
                post={post}
              />
            ))
          ) : (
            <div className="no-post">
              <h4>No Posts yet</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RenderAllPosts;
