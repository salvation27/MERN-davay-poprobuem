import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  comments: [],
  isLoading: false,
  status: null,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }) => {
    try {
      console.log(postId, comment);
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPostComments = createAsyncThunk(
  "comment/getAllPostComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data
    } catch (error) {
      console.log(error)
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  //   обект где можем управлять  состоянием
  extraReducers: {
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
      //   state.status = action.payload.message;
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    // get post comments
    [getAllPostComments.pending]: (state) => {
      state.loading = true;
    },
    [getAllPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments= action.payload
      //   state.status = action.payload.message;
    },
    [getAllPostComments.rejected]: (state, action) => {
      state.isLoading = false;
      // state.status = action.payload.message;
    },
  },
});

export default commentSlice.reducer;
