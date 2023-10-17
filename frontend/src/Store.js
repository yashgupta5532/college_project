import {configureStore} from "@reduxjs/toolkit"

import { userReducer } from "./Reducer/UserReducer"

const store=configureStore({
    reducer :{
        user:userReducer,
    }
})

export default store;