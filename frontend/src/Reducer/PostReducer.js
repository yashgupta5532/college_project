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
  COMMENT_POST_FAIL
} from "../Constants/PostConstant";

export const postReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case ALL_POST_REQUEST:
    case LOAD_POST_REQUEST:  //myPosts is the load posts
    case SEARCH_POST_REQUEST:
    case SINGLE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case COMMENT_POST_REQUEST:
      return {
        ...state,
        loading: true,
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
        ...state.post,
        loading:false,
        likes:action.payload.likes
      }
    case COMMENT_POST_SUCCESS:
      return {
        ...state.post,
        loading:false,
        comments:action.payload.comments
      }
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
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case CREATE_POST_FAIL:
    case ALL_POST_FAIL:
    case LOAD_POST_FAIL:
    case SEARCH_POST_FAIL:
    case SINGLE_POST_FAIL:
    case LIKE_POST_FAIL:
    case COMMENT_POST_FAIL:
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
