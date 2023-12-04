import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import {useAlert} from "react-alert"
import { logout } from "../../Action/UserAction";

const Navbar = () => {
  const alert= useAlert();
  const dispatch=useDispatch();
  const { userId, role } = useSelector((state) => state.user);
  const handleLogout=async()=>{
    await dispatch(logout())
    alert.success("Logout successfully")
  }

  return (
    <Fragment>
      <div className="nav-container">
        <ul>
          <Link to="/">
            <li className="nav">Home</li>
          </Link>
          {role && role === "admin" && (
            <Link to="/admin">
              <li className="/admin">Admin</li>
            </Link>
          )}
          <Link to="/post">
            <li className="nav">Create Post</li>
          </Link>
          <Link to="/search">
            <li className="nav">Search Post</li>
          </Link>
          <Link to={`/profile/${userId}`}>
            <li className="nav">Profile</li>
          </Link>
          <Link to="/about">
            <li className="nav">About us</li>
          </Link>
          <Link to="/register">
            <li className="nav">Sign-Login</li>
          </Link>
          <Link to="/" onClick={handleLogout}>
            <li className="nav">Logout</li>
          </Link>
        </ul>
      </div>
    </Fragment>
  );
};

export default Navbar;
