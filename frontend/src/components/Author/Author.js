import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featuredAuthors } from "../../Action/UserAction";
import AuthorCard from "./AuthorCard";

const Author = () => {

  const dispatch = useDispatch();
  const authors = useSelector((state) => state.user.featuredAuthors);
  useEffect(() => {
    dispatch(featuredAuthors());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="feature-authors-container-main">
        {authors &&
          authors.map((author) => {
            return <AuthorCard key={author._id} author={author} />;
          })}
      </div>
    </Fragment>
  );
};

export default Author;
