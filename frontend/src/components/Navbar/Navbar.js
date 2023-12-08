import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import {useAlert} from "react-alert"
import { logout } from "../../Action/UserAction";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CallIcon from '@mui/icons-material/Call';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import SearchIcon from '@mui/icons-material/Search';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

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
          <Link to="/" className="d-none">
            
            <li className="nav"><HomeIcon/></li>
          </Link>
          {role && role === "admin" && (
            <Link to="/admin">
              
              <li className="/admin"><AdminPanelSettingsIcon/>Admin</li>
            </Link>
          )}
          <Link to="/post" className="d-none">
            <li className="nav"><CropOriginalIcon/>Post</li>
          </Link>
          <Link to="/search" className="d-none">
            <li className="nav"><SearchIcon/></li>
          </Link>
          <Link to={`/profile/${userId}`} className="d-none">
            <li className="nav"><AccountCircleIcon/></li>
          </Link>
          <Link to="/contact">
            <li className="nav"><CallIcon/></li>
          </Link>
          <Link to="/login">
            <li className="nav"><FingerprintIcon/>Login</li>
          </Link>
          <Link to="/" onClick={handleLogout} >
            <li className="nav"><LogoutIcon/></li>
          </Link>
          {/* <Link to="/profile/update">
            <li className="nav">update Profile</li>
          </Link> */}
        </ul>
      </div>
    </Fragment>
  );
};

export default Navbar;
