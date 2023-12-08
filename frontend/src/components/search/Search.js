import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import "./Search.css";
import { searchPost } from "../../Action/PostAction";
import { Link } from 'react-router-dom';

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(keyword);
      const response = await dispatch(searchPost(keyword));
      console.log("response is", response);
      if (response?.success) {
        setPosts(response.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error("Error in dispatching searchPost:", error);
    }
  };

  console.log("posts", posts);

  return (
    <Fragment>
      <div className="search">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search posts"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      {posts && (
        <div className="search-results">
          {posts.map((post) => (
            <Link to={`/profile/${post.owner}`} key={post._id}>
              <p>{post.title}</p>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Search;
