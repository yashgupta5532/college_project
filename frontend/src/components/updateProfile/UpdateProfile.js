import { Avatar, Button, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
// import KeyIcon from "@mui/icons-material/Key";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { updateProfile } from "../../Action/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const UpdateProfile = () => {
  //   const user = useSelector((state) => state.user);
  const { loading, name, email, avatar, myStatus } = useSelector(
    (state) => state.user
  );
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedAvatar, setUpdatedAvatar] = useState(avatar.url);
  const [updatedStatus, setUpdatedStatus] = useState(myStatus);

  console.log(name, email, avatar, myStatus);
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setUpdatedAvatar(Reader.result);
      }
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      updateProfile(updatedName, updatedEmail, updatedAvatar, updatedStatus)
    );
    if (response?.success) {
      alert.success(response.message);
      setUpdatedName(response.user.name);
      setUpdatedEmail(response.user.email);
      setUpdatedAvatar(response.user.avatar.url);
      setUpdatedStatus(response.user.myStatus);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="register-form">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Update Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="register-form-container">
              <div className="form-group" style={{ margin: "auto" }}>
                <Avatar
                  src={updatedAvatar}
                  alt="user-img"
                  sx={{ height: "5vmax", width: "5vmax", margin: "auto" }}
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="form-group">
                <AccountBoxIcon />
                <input
                  type="text"
                  placeholder="Update your name"
                  name="name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="register-input"
                />
              </div>
              <div className="form-group">
                <EmailIcon />
                <input
                  type="email"
                  placeholder="Update your Email"
                  name="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="register-input"
                />
              </div>
              {/* <div className="form-group">
                <KeyIcon />
                <input
                  type="password"
                  placeholder="Update your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="register-input"
                />
              </div> */}
              <div className="form-group">
                <WhatshotIcon />
                <input
                  type="text"
                  placeholder="Update your Status"
                  name="status"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  className="register-input"
                />
              </div>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
