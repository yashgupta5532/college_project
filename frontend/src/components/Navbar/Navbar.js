import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const { userId, role } = useSelector((state) => state.user);
  console.log(userId,role)

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
        </ul>
      </div>
    </Fragment>
  );
};

export default Navbar;
