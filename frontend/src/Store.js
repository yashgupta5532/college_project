import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./Reducer/UserReducer";
import { postReducer } from "./Reducer/PostReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
});

export default store;
