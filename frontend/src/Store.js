import { configureStore } from "@reduxjs/toolkit";

import { userReducer, userUpdate } from "./Reducer/UserReducer";
import { adminReducer, postReducer } from "./Reducer/PostReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo:userUpdate,
    post: postReducer,
    postAdmin:adminReducer
  },
});

export default store;
