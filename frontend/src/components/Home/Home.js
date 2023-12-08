import React, { Fragment } from "react";
import "./Home.css";
import Author from "../Author/Author";
import HomeSlider from "../Carousel/HomeSlider";
import RenderAllPosts from "../PostRender/RenderAllPosts"

const Home = () => {
  return (
    <Fragment>
        <Fragment>
          <Author />
          <HomeSlider/>
          <RenderAllPosts/>
        </Fragment>
    </Fragment>
  );
};

export default Home;
