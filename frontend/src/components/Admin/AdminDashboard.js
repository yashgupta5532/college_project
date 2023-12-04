import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminPosts, approvePost, deletePost, rejectPost } from "../../Action/PostAction";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const backendUrl = process.env.REACT_APP_BACKTEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =await dispatch(adminPosts());
        if (response.success) {
          setPosts(response.posts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const updatepostStatus = async (postId, newStatus) => {
    try {
      if (newStatus === "Approved") {
        await dispatch(approvePost(postId));
      } else if (newStatus === "Rejected") {
        await dispatch(rejectPost(postId))
      }
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, status: newStatus } : post
        )
      );
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  const handleDelete = async (postId)=>{
    try {
      await dispatch(deletePost(postId))
      setPosts((prevPosts) =>
       prevPosts.filter((post)=>{
        return post._id !==postId;
       })
      );
    } catch (error) {
      console.log('error while deleting the post')
    }
  }

  return (
    <div className="admin-dashboard">
      <h1 style={{ textAlign: "center" }}>
        All posts (Pending/Rejected/Approved)
      </h1>
      <Link to="/contactinfo" className="contact-info">
        Contact us info{" "}
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <div className="note-info">
              <h4>{post.title}</h4>
              <p>
                Uploaded by:{" "}
                <b>
                  {post.owner?.name} ({post.owner?.email})
                </b>
              </p>
              <p>
                Title: <b> {post.title}</b>
              </p>
              <p>
                Status: <b> {post.status}</b>
              </p>
              <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
              <div className="item">
                <a
                  href={post.images[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </a>
                {post.images && (
                  <img src={post.images[0].url} alt="Thumbnail" />
                )}
              </div>
            </div>
            <div className="post-actions">
              {post.status === "Pending" && (
                <>
                  <button
                    className="approve-button"
                    onClick={() => updatepostStatus(post._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => updatepostStatus(post._id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button className="delete-button" onClick={()=> handleDelete(post._id)}>Delete</button>
                </>
              )}
              {post.status === "Approved" && (
                <>
                  <button
                    className="reject-button"
                    onClick={() => updatepostStatus(post._id, "Rejected")}
                  >
                    Re-Reject
                  </button>
                  <button className="delete-button" onClick={()=> handleDelete(post._id)}>Delete</button>
                </>
              )}
              {post.status === "Rejected" && (
                <>
                  <button
                    className="approve-button"
                    onClick={() => updatepostStatus(post._id, "Approved")}
                  >
                    Re-Approve
                  </button>
                  <button className="delete-button" onClick={()=> handleDelete(post._id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
