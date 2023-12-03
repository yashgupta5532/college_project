import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Action/UserAction";
import store from "./Store";
import Login from "./components/Login/Login";
import CreatePost from "./components/Post/Post";
import Profile from "./components/Profile/Profile";
import { loadPost } from "./Action/PostAction";
import RenderAllPosts from "./components/PostRender/RenderAllPosts";
import Search from "./components/search/Search";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/forgotPassword/ResetPassword";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Nnavbar from "./components/Navbar/Navbar";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadPost());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      {/* <Nnavbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/profile/:userId" element={<Profile/>} />
        <Route path="/allPosts" element={<RenderAllPosts/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset" element={<ResetPassword/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
