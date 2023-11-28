import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Search.css';
import { searchPost } from '../../Action/PostAction';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(keyword)
      const response = await dispatch(searchPost(keyword));
      console.log('response is', response);
  
      if (response && response.success) {
        setPosts(response.posts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error in dispatching searchPost:', error);
    }
  };
  

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
        <div>
          {posts.map((post) => (
            // Render each post
            <div key={post._id}>
              {/* Render post content */}
              <p>{post.title}|| {post.description}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Search;
