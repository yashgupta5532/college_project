import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featuredAuthors } from "../../Action/UserAction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AuthorCard from "./AuthorCard";
import Navbar from "../Navbar/Navbar";

const options = {
  autoPlay: true,
  autoFocus: true,
  interval: 5000,
  stopOnHover: false,
  transitionTime: 500,
  showArrows: true,
  showStatus: true,
  showThumbs: false,
  centerMode: false,
  dynamicHeight: false,
  emulateTouch: true,
  infiniteLoop: true,
  swipeable: true,
  useKeyboardArrows: true,
  swipeScrollTolerance: 40,
  // showIndicators: true,
  axis: "horizontal",
};

const Author = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.user.featuredAuthors);
  useEffect(() => {
    dispatch(featuredAuthors());
  }, [dispatch]);

  return (
    <Fragment>
      <Navbar />
      {/* <Carousel {...options}> */}
          <div className="feature-authors-container-main">
            {authors &&
              authors.map((author) => {
                return <AuthorCard key={author._id} author={author} />;
              })}
          </div>
      {/* </Carousel> */}
    </Fragment>
  );
};

export default Author;
