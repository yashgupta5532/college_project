import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  FEATURED_AUTHORS_REQUEST,
  FEATURED_AUTHORS_SUCCESS,
  FEATURED_AUTHORS_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  GET_USERDETAIL_REQUEST,
  GET_USERDETAIL_SUCCESS,
  GET_USERDETAIL_FAIL,
  CLEAR_ERRORS,
} from "../Constants/UserConstant";

import axios from "axios";

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "content-type": "multipart/form-data" } };
    const { data } = await axios.post(
      "/api/v1/user/register",
      {name, email, password, avatar},
      {config}
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    return { success:true,data}
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
    // return {success:false,error : error.response.data.message}
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/v1/user/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const getUserDetails =(userId) =>async (dispatch) => {
  try {
    dispatch({type:GET_USERDETAIL_REQUEST})
    const {data} = await axios.get(`/api/v1/user/${userId}`)
    dispatch({type:GET_USERDETAIL_SUCCESS,payload:data.user})
    return {success:true,user:data.user}
  } catch (error) {
    dispatch({type:GET_USERDETAIL_FAIL,payload:error.response.data.message})
    return { success: false, error: error.response.data.message };
  }
}

export  const login = (email,password) =>async (dispatch) => {
  try {
    dispatch({type:LOGIN_USER_REQUEST})
    const config={headers:{"content-type":"application/json"}}
    const {data} =await axios.post("/api/v1/user/login",{email,password},{config})
    dispatch({type:LOGIN_USER_SUCCESS,payload:data.user})
    return {success:true,data}
  } catch (error) {
    dispatch({type:LOGIN_USER_FAIL,payload:error.response.data.message})
  }
}

export const logout = () => async (dispatch) =>{
  try {
    dispatch({type:LOGOUT_USER_REQUEST});
    await axios.post("/api/v1/user/logout");
    dispatch({type:LOGOUT_USER_SUCCESS});
    return {success:true}
  } catch (error) {
    dispatch({type:LOGOUT_USER_FAIL,payload:error.message})
  }
}

export const featuredAuthors=()=> async (dispatch) =>{
  try {
    dispatch({type:FEATURED_AUTHORS_REQUEST});
    const {data} =await axios.get("/api/v1/user/stats/authors");
    dispatch({type:FEATURED_AUTHORS_SUCCESS,payload:data.featuredAuthors})
  } catch (error) {
    dispatch({type:FEATURED_AUTHORS_FAIL,payload:error.response.data.message})
  }
}



export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
