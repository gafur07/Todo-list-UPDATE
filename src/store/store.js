import { configureStore } from "@reduxjs/toolkit";
import PostsReducer from "./reducers/postsSlice";

export const store = configureStore({
    reducer: {
        posts: PostsReducer
    }
})