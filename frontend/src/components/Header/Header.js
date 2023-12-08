import React, { Fragment, useEffect } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, logout } from "../../Action/UserAction";

const Header = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error} = useSelector((state) => state.user);
  const handleLogout=async()=>{
   const response= await dispatch(logout())
   if(response.success){
    alert.success("Logout successfully")
   }
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
  }, [error, alert, dispatch]);

  const options = {
    burgerColor: "blue",
    burgerColorHover: "royalblue",
    navColor1: "black",
    navColor2: "white",
    logo,
    logoWidth: "150px",
    logoHeight: "150px",
    nav1alignItems: "center",
    nav1justifyContent: "space-around",
    link1Text: "Home",
    link2Text: "Create post",
    link3Text: "SignUp",
    link4Text: "Contact us",
    link1Url: "/",
    link2Url: "/post",
    link3Url: "/register",
    link4Url: "/contact",
    link1Size: "2vmax",
    link1ColorHover: "blue",
    link1Margin: "auto",
    link1Border: "1 px solid green",
    searchIcon: true,
    SearchIconElement: SearchIcon,
    searchIconSize: "4vmax",
    searchIconColor: "black",
    cartIcon: true,
    CartIconElement: ExitToAppIcon,
    cartIconColor: "black",
    cartIconSize: "4vmax",
    ProfileIconElement: AccountBoxIcon,
    profileIcon: true,
    profileIconColor: "black",
    searchIconMargin: "1vmax",
    cartIconMargin: "1vmax",
    profileIconMargin: "1vmax",
    searchIconUrl: "/search",
    cartIconUrl: "/logout",
    profileIconUrl: "/profile",
    searchIconColorHover: "blue",
    cartIconColorHover: "blue",
    profileIconColorHover: "blue",
  };

  return (
    <Fragment>
      <div className="overlay-navBar">
        <ReactNavbar {...options} />
      </div>
    </Fragment>
  );
};

export default Header;
