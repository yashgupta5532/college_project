import React, { Fragment } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../images/img1.jpeg";
import img2 from "../images/img2.jpeg";
import img3 from "../images/img3.jpeg";
import img4 from "../images/img4.jpeg";
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
      <Carousel
        autoPlay={true}
        autoFocus={true}
        interval={3000}
        stopOnHover={false}
        transitionTime={500}
        showArrows={true}
        showStatus={true}
        showThumbs={false}
        centerMode={false}
        dynamicHeight={false}
        emulateTouch={true}
        infiniteLoop={true}
        showIndicators={true}
        axis="horizontal"
      >
        <div className="slide">
          <img src={img1} alt="img1" />
          <p className="legend">"Mess food may be humble, but it has the power to bring people together and create lasting bonds."</p>
        </div>
        <div className="slide">
          <img src={img2} alt="img1" />
          <p className="legend">"In the world of food, the hostel mess is where you'll find comfort, flavor, and a taste of home."</p>
        </div>
        <div className="slide">
          <img src={img3} alt="img1" />
          <p className="legend">"A mess full of friends and delicious food is the recipe for unforgettable memories."</p>
        </div>
        <div className="slide">
          <img src={img4} alt="img1" />
          <p className="legend">"In a hostel mess, every meal is a chance to explore a world of flavors."</p>
        </div>
      </Carousel>
    

    </Fragment>
  );
};

export default Home;
