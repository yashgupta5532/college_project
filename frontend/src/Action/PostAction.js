import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAIL,
  ALL_POST_REQUEST,
  ALL_POST_SUCCESS,
  ALL_POST_FAIL,
  SEARCH_POST_REQUEST,
  SEARCH_POST_SUCCESS,
  SEARCH_POST_FAIL,
  SINGLE_POST_REQUEST,
  SINGLE_POST_SUCCESS,
  SINGLE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
  COMMENT_POST_FAIL,
  ADMIN_REQUEST,
  ADMIN_SUCCESS,
  ADMIN_FAIL,
} from "../Constants/PostConstant";

import axios from "axios";

export const createPost = (title, description,images) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });
    const config = { headers: { "Content-type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/api/v1/post/createPost",
      { title, description,images },
      {config}
    );
    dispatch({ type: CREATE_POST_SUCCESS, payload: data.newPost });
    return {success:true,data}
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.response.data.message });
  }
};

export const adminPosts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REQUEST });
    const { data } = await axios.get("/api/v1/post/admin");
    dispatch({
      type: ADMIN_SUCCESS,
      payload:data.filteredPosts || [], // Ensure `data.filteredPosts` is not undefined
    });
    return {success:true,posts:data.filteredPosts}
  } catch (error) {
    dispatch({
      type: ADMIN_FAIL,
      payload: error.response ? error.response.data.message : 'An error occurred',
    });
  }
};

//my post is the loadPost
export const loadPost = () => async (dispatch) =>{
  try {
    dispatch({type:LOAD_POST_REQUEST})
    const {data} =await axios.get("/api/v1/post/myposts")
    dispatch({type:LOAD_POST_SUCCESS,payload:data.myPosts})
  } catch (error) {
    dispatch({type:LOAD_POST_FAIL,payload:error.response.data.message})
  }
}

export const allPosts = () => async (dispatch) => {
  try {
    dispatch({type:ALL_POST_REQUEST});
    const {data} =await axios.get("/api/v1/post/all-posts");
    dispatch({type:ALL_POST_SUCCESS,payload:data.posts});
    return {success:true,posts:data.posts}
  } catch (error) {
    dispatch({type:ALL_POST_FAIL,payload:error.response.data.message})
  }
}

export const searchPost = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: 'SEARCH_POST_REQUEST'
    });

    const {data} = await axios.get(`/api/v1/search/${keyword}`);
    console.log("data ",data)

    dispatch({
      type: 'SEARCH_POST_SUCCESS',
      payload: {
        success: true,
        posts: data.posts,
      },
    });

    return { success: true, posts: data.posts }; 
  } catch (error) {
    console.error('Error searching posts:', error);
    dispatch({
      type: 'SEARCH_POST_FAIL',
      payload: {
        success: false,
        error: error.message,
      },
    });
  }
};


export const singlePost = (postId) => async (dispatch) =>{
  try {
    dispatch({type:SINGLE_POST_REQUEST})
    const {data} = await axios.get(`/api/v1/post/${postId}`)
    dispatch({type:SINGLE_POST_SUCCESS,payload:data})
    return ({success:true,post:data.post})
  } catch (error) {
    dispatch({type:SINGLE_POST_FAIL,payload:error.response.data.message})
  }
}

export const likeDislikePost = (postId) => async (dispatch) => {
  try {
    dispatch({type:LIKE_POST_REQUEST})
    const {data} = await axios.post(`/api/v1/post/like-dislike/${postId}`);
    dispatch({type:LIKE_POST_SUCCESS,payload:data})
  } catch (error) {
    dispatch({type:LIKE_POST_FAIL,payload:error.response.data.message})
  }
}

export const commentOnPost = (comment, postId) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_POST_REQUEST });
    const { data } = await axios.post(`/api/v1/post/comment/${postId}`, { comment }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: COMMENT_POST_SUCCESS, payload: data });
    return {success:true,data}
  } catch (error) {
    dispatch({ type: COMMENT_POST_FAIL, payload: error.response.data.message });
  }
};

