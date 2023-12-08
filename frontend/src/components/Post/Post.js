import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createPost } from "../../Action/PostAction";
import Loader from "../Loader/Loader";

const Post = () => {
  const [images, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.post);
  const alert = useAlert();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createPost(title, description, images));
    if (response?.success) {
      alert.success("Post created successfully");
      setTitle("");
      setDescription("");
      setImage(null);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="new-post">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Create post
          </Typography>
          <div className="post-form-container">
            <form className="post-form" onSubmit={handleSubmit}>
              <div className="form" style={{ textAlign: "center" }}>
                {images && <img src={images} alt="post" />}
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageChange}
                />
              </div>
              <div className="form">
                {" "}
                <input
                  type="text"
                  name="title"
                  placeholder="title here"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form">
                {" "}
                <input
                  type="text"
                  name="description"
                  placeholder="Description here"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button type="submit">Post</Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Post;
