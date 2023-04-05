import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMe, getData } from "../../services/protectApi";

export const getMyHistory = createAsyncThunk(
  "user/history",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("history");
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  history: [],
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getMe.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
    [getMe.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [getMe.fulfilled]: (state, { payload }) => {
      state.history = payload;
    },
    [getMe.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default userSlice.reducer;
