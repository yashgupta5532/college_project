import React, { Fragment } from "react";
import "./Home.css";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Author from "../Author/Author";
import HomeSlider from "../Carousel/HomeSlider";
import RenderAllPosts from "../PostRender/RenderAllPosts"

const Home = () => {
  const { loading } = useSelector((state) => state.user);
  return (
    // <Fragment>
    //   {loading ? (
    //     <Loader />
    //   ) : (
        <Fragment>
          <Author />
          <HomeSlider/>
          <RenderAllPosts/>
        </Fragment>
      )}
    // </Fragment>
  // );
// };

export default Home;
