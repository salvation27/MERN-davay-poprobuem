import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  status: null,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts/create", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postDelete = createAsyncThunk("post/postDelete", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const postUpdate = createAsyncThunk(
  "post/postUpdate",
  async (updatedPost) => {
    try {
     console.log("updatedPost", updatedPost);
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // Create Post
    [createPost.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
      state.status = action.payload.message;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    // Get All Posts
    [getAllPosts.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
      state.status = action.payload.message;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Remove Post
    [postDelete.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [postDelete.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(
        (item) => item._id !== action.payload._id
      );
      state.status = action.payload.message;
    },
    [postDelete.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Update Post
    [postUpdate.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [postUpdate.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex(
        (item) => item.id === action.payload._id
      );
      state.posts[index] = action.payload
// console.log("action.payload", action.payload);
      state.status = action.payload.message;
    },
    [postUpdate.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
  },
});

export default postSlice.reducer;
