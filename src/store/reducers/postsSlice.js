import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
}

const postsSlice = createSlice({
    name: "posts",
    initialState,

    reducers: {
        fetchPosts: (state, action) => {
            state.posts = action.payload
        },

        deletePosts: (state, action) => {
            state.posts = state.posts.filter(item => item.id !== action.payload)
        },

        upDatePost: (state, action) => {
           state.posts.map(item => {
                if(item.id === action.payload.id) {
                    item.id = action.payload.id,
                    item.title = action.payload.title
                }
            })
        }

    }
})

export const { fetchPosts, deletePosts, upDatePost } = postsSlice.actions
const PostsReducer = postsSlice.reducer
export default PostsReducer