import { configureStore } from "@reduxjs/toolkit";
import { allPostReducer, likeReducer, myPostsReducer, userPostsReducer, wallpaperReducer } from "./Reducer/Post";
import { authReducer, followingPostReducer, profileReducer, seachUserReducer, userProfileReducer } from "./Reducer/User";


const store = configureStore({
    reducer:{
        auth: authReducer,
        profile:profileReducer,
        postdisplay:followingPostReducer,
        searchUser:seachUserReducer,

        likeComment: likeReducer,
        myPosts: myPostsReducer,
        userPosts: userPostsReducer,
        userInfo: userProfileReducer,
        allPost:allPostReducer,
        wallpaper:wallpaperReducer,
    }
  
  });
  
  export default store;


  export const server = "https://shades.onrender.com/shades/v1";