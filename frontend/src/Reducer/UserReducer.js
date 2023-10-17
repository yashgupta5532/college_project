import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
} from "../Constants/UserConstant"

export const userReducer=(state={user:{}},action)=>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return{
                loading:true,
                isAuthenticatedUser:false
            };
        case REGISTER_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticatedUser:true,
                user:action.payload
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticatedUser:false,
                error:action.payload
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
