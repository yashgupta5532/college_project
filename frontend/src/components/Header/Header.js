import React, { Fragment } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../images/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Header = () => {
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
    link2Text: "About us",
    link3Text: "Contact us",
    link4Text: "Profile",
    link1Url: "/home",
    link2Url: "/contact",
    link3Url: "/aboutUs",
    link4Url: "/profile",
    link1Size: "2vmax",
    link1ColorHover: "blue",
    link1Margin: "auto",
    link1Border: "1 px solid green",
    searchIcon: true,
    SearchIconElement: SearchIcon,
    searchIconSize: "2vmax",
    searchIconColor: "black",
    cartIcon: true,
    CartIconElement: ShoppingCartIcon,
    cartIconColor: "black",
    ProfileIconElement: AccountBoxIcon,
    profileIcon: true,
    profileIconColor: "black",
    searchIconMargin: "1vmax",
    cartIconMargin: "1vmax",
    profileIconMargin: "1vmax",
    searchIconUrl: "/search",
    cartIconUrl: "/cart",
    profileIconUrl: "/profile",
    searchIconColorHover: "blue",
    cartIconColorHover: "blue",
    profileIconColorHover: "blue",
  };
  return (
    <Fragment>
      <ReactNavbar {...options} />
    </Fragment>
  );
};

export default Header;
