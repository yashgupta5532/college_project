import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../Action/UserAction";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loading} = useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const alert =useAlert();
  const navigate= useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await dispatch(login(email,password))
    if(response?.success){
      alert.success("LoggedIn Successfully")
      setEmail("");
      setPassword("");
      navigate("/")
    }
  }
 
  return (
    <Fragment>
      {loading ? <Loader/> :<div className="register-form">
        <Typography variant="h4" style={{ textAlign: "center" }}>
          Login here...
        </Typography>
        <div className="login-form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group login-form">
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
            <div className="form-group login-form">
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
            <Button type="submit">Login</Button>
            <div className="register-info">
                  <Link to="/">
                    <Typography>Already Logged in ? Go to Home page</Typography>
                  </Link>
                  <Link to="/password/forgot">
                    <Typography>Forgot password</Typography>
                  </Link>
                </div>
          </form>
        </div>
      </div>}
    </Fragment>
  );
};

export default Login;
