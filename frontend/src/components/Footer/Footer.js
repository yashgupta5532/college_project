import React, { Fragment } from "react";
import logo from "../images/logo.png";
import study from "../images/study.jpg";
import "./Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <div className="footer-container">
        <div className="footer-1">
          <div className="img-1">
            <a
              href="http://www.studywithmaterial.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={logo} alt="logo" />
            </a>
          </div>
          <div className="img-1">
            <p> AllRights are Reserved &copy;Copyright</p>
          </div>
        </div>
        <div className="footer-1">
          <div className="content-heading">
            <h4 className="headline">
              <i>
                "Hostel Mess Headlines: Satisfying Palates, Sparking
                Conversations, and Creating Culinary Memories in the Heart of
                Hospitality."
              </i>
            </h4>
          </div>
          <div className="icons" style={{margin:"auto"}}>
            <a
              href="http://studywithmaterial.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={study} alt="study img" />
            </a>
          </div>
        </div>
        <div className="footer-1 ">
          <div className="icons icons1">
            <a href="https://www.linkedin.com/in/yash-gupta-1a0055267" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
            <a href="https://github.com/yashgupta5532?tab=repositories" target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> Github
            </a>
            <a href="https://www.facebook.com/profile.php?id=100042500148710" target="_blank" rel="noopener noreferrer">
              <FacebookIcon /> Facebook
            </a>
            <Link to="/contact">
              <ContactMailIcon /> Contact us
              </Link>
          </div>
          <div className="info">
            <p>Designed By : <b>Yash Gupta</b> </p>
            <p>Contact No : <b>8969364937</b></p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
