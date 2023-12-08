import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePost.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updatePost } from "../../Action/PostAction";
import Loader from "../Loader/Loader";

const UpdatePost = ({ postId, image, titled, desc }) => {
  const [images, setImage] = useState(image);
  const [title, setTitle] = useState(titled);
  const [description, setDescription] = useState(desc);
  const dispatch = useDispatch();
  const { loading} = useSelector((state) => state.postAdmin);
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
  const updatedData = {
    images,
    title,
    description,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(updatePost(updatedData, postId));
    if (response?.success) {
      alert.success(response.message);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="update-post">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Update post
          </Typography>
          <div className="updatePost-form-container">
            <form className="updatePost-form" onSubmit={handleSubmit}>
              <div className="form " style={{ textAlign: "center" }}>
                {images && <img src={images} alt="post" />}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="form">
                {" "}
                <input
                  type="text"
                  name="title"
                  placeholder="title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form">
                {" "}
                <textarea
                  name="description"
                  placeholder="Description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4} 
                  cols={50} 
                />
              </div>
              <Button type="submit">Update</Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdatePost;
