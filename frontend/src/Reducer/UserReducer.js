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
    GET_USERDETAIL_REQUEST,
    GET_USERDETAIL_SUCCESS,
    GET_USERDETAIL_FAIL,
    CLEAR_ERRORS,
} from "../Constants/UserConstant"

export const userReducer=(state={user:[]},action)=>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case GET_USERDETAIL_REQUEST:
            return{
                ...state,
                loading:true,
                isAuthenticatedUser:false
            };
        case FEATURED_AUTHORS_REQUEST:
            return{
                ...state,
                loading:true,
                featuredAuthors:[],
            }
        
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
        case GET_USERDETAIL_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticatedUser:true,
                user:action.payload
            }
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticatedUser:true,
                userId:action.payload._id,
                avatar:action.payload.avatar,
                name:action.payload.name,
                email:action.payload.email,
                password:action.payload.password,
                role:action.payload.role,
                posts:action.payload.posts,
                myStatus:action.payload.myStatus,
                followers:action.payload.followers,
                following:action.payload.following
            }
        case FEATURED_AUTHORS_SUCCESS:
            return{
                ...state,
                loading:false,
                featuredAuthors:action.payload,
            }
        
        case REGISTER_USER_FAIL:
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticatedUser:false,
                error:action.payload
            }
        case FEATURED_AUTHORS_FAIL:
        case GET_USERDETAIL_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        case LOAD_USER_FAIL:
            return {
                loading:false,
                isAuthenticatedUser:false,
                user:null,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }   

}
