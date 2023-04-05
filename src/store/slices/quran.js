import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../services/protectApi";

export const getQuran = createAsyncThunk(
  "quran/getAllQuran",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("quran", params);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  quran: [],
  loading: "",
  error: null,
};

const quranSlice = createSlice({
  name: "quran",
  initialState,
  reducers: {},
  extraReducers: {
    [getQuran.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getQuran.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.quran = payload;
    },
    [getQuran.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default quranSlice.reducer;
