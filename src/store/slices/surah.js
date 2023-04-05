import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../services/protectApi";

export const getSurah = createAsyncThunk(
  "surah/getSurah",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("quran", params);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getPage = createAsyncThunk(
  "surah/getPage",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("quran", params);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const getJuz = createAsyncThunk(
  "surah/getJuz",
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
  surahs: [],
  surah: null,
  juz: null,
  loading: "",
  page: null,
  error: null,
};

const surahSlice = createSlice({
  name: "surah",
  initialState,
  reducers: {},
  extraReducers: {
    [getSurah.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getSurah.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.surah = payload;
      state.surahs = [...state.surahs, payload];
    },
    [getSurah.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [getPage.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getPage.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.page = payload;
    },
    [getPage.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [getJuz.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getJuz.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.juz = payload;
    },
    [getJuz.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default surahSlice.reducer;
