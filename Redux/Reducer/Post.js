import { createReducer } from "@reduxjs/toolkit";

export const likeReducer = createReducer(
  {},
  {
    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    likeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCommentRequest: (state) => {
      state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    newPostRequest: (state) => {
      state.loading = true;
    },
    newPostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    newPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCaptionRequest: (state) => {
      state.loading = true;
    },
    updateCaptionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateCaptionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deletePostRequest: (state) => {
      state.loading = true;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateProfileRequest: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteProfileRequest: (state) => {
      state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    followUserRequest: (state) => {
      state.loading = true;
    },
    followUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    followUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);

export const myPostsReducer = createReducer(
  {},
  {
    myPostsRequest: (state) => {
      state.loading = true;
    },
    myPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const userPostsReducer = createReducer(
  {},
  {
    userPostsRequest: (state) => {
      state.loading = true;
    },
    userPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    userPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const allPostReducer = createReducer(
  {},
  {
    allPostsRequest: (state) => {
      state.loading = true;
    },
    allPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    allPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const wallpaperReducer = createReducer(
  {},
  {
    wallpaperRequest: (state) => {
      state.loading = true;
    },
    walpaperSuccess: (state, action) => {
      state.loading = false;
      state.allposts = action.payload;
    },
    wallpaperFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);
