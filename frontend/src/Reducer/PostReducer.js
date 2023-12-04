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
  REJECT_POST_REQUEST,
  REJECT_POST_SUCCESS,
  REJECT_POST_FAIL,
  APPROVE_POST_REQUEST,
APPROVE_POST_SUCCESS,
APPROVE_POST_FAIL,
DELETE_POST_REQUEST,
DELETE_POST_SUCCESS,
DELETE_POST_FAIL,
} from "../Constants/PostConstant";

export const postReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case ALL_POST_REQUEST:
    case LOAD_POST_REQUEST: //myPosts is the load posts
    case SEARCH_POST_REQUEST:
    case SINGLE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case COMMENT_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        posts: [],
      };
    case CREATE_POST_SUCCESS:
    case SINGLE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          likes: action.payload.likes,
        },
      };
    case COMMENT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: action.payload.comments,
        },
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        title: action.payload.title,
        description: action.payload.description,
        images: action.payload.images,
        status: action.payload.status,
        owner: action.payload.owner,
        likes: action.payload.likes,
        comments: action.payload.comments,
      };

    case ALL_POST_SUCCESS:
    case SEARCH_POST_SUCCESS:
    case ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload || [],
      };

    case CREATE_POST_FAIL:
    case ALL_POST_FAIL:
    case LOAD_POST_FAIL:
    case SEARCH_POST_FAIL:
    case SINGLE_POST_FAIL:
    case LIKE_POST_FAIL:
    case COMMENT_POST_FAIL:
    case ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export const adminReducer = (state, action) => {
  switch (action.type) {
    case REJECT_POST_REQUEST:
    case APPROVE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return{
        ...state,
        loading:true,
      }
    case REJECT_POST_SUCCESS:
    case APPROVE_POST_SUCCESS:
    case DELETE_POST_SUCCESS:
      return{
        ...state,
        loading:false,
        post:action.payload
      }
    case REJECT_POST_FAIL:
    case APPROVE_POST_FAIL:
    case DELETE_POST_FAIL:
      return{
        ...state,
        loading:false,
      }

    default:
      return{
        ...state
      }
  }
};


