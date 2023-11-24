import { Avatar, Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./Register.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { Link } from "react-router-dom";
import { clearErrors, register } from "../../Action/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { error, loading, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(register(name, email, password, avatar));
    if(response.success){
      alert.success("Registered successfully");
      setName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
    }
   
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="register-form">
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Register....
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="register-form-container">
              <div className="form-group" style={{ margin: "auto" }}>
                <Avatar
                  src={avatar}
                  alt="user-img"
                  sx={{ height: "5vmax", width: "5vmax", margin: "auto" }}
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  required
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="form-group">
                <AccountBoxIcon />
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="register-input"
                  required
                />
              </div>
              <div className="form-group">
                <EmailIcon />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="register-input"
                  required
                />
              </div>
              <div className="form-group">
                <KeyIcon />
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="register-input"
                  required
                />
              </div>
              <Button type="submit">Register</Button>
              <div className="register-info">
                <Link to="/login">
                  <Typography>Already Signed up ? Login now</Typography>
                </Link>
                <Link to="/forgot/password">
                  <Typography>Forgot password</Typography>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default Register;
