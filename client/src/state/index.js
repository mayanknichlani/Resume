import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:"light",
    user:null,
    token:null,
    posts:[]
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "light"?"dark":"light";
        },
        setLogin:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout:(state)=>{
            state.token = null;
            state.user = null;
        },
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            else{
                console.error("User Friends non existant! ");
            }
        },
        setPosts:(state,action)=>{
            state.posts = action.payload.posts;
        },
        setPost:(state,action)=>{
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post_id)return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
        
    }
});

export const {setMode,setLogin,setPosts,setPost,setLogout,setFriends} = authSlice.actions;
export default authSlice.reducer;