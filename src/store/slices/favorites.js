import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOne, deleteOne, getData } from "../../services/protectApi";

export const getFavorites = createAsyncThunk(
  "favorites/getFavorites",
  async (filter, { getState, rejectWithValue }) => {
    try {
      const { data } = await getData("quran/bookmark");
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const addFavorites = createAsyncThunk(
  "favorites/addFavorites",
  async (surahId, { getState, rejectWithValue }) => {
    try {
      const { data } = await createOne("quran/bookmark", { surahId });
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const deleteFavorites = createAsyncThunk(
  "favorites/deleteFavorites",
  async (surahId, { getState, rejectWithValue }) => {
    try {
      const { data } = await deleteOne("quran/bookmark", surahId);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  favorites: [],
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: {
    [getFavorites.fulfilled]: (state, { payload }) => {
      state.favorites = payload;
    },
    [getFavorites.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [addFavorites.fulfilled]: (state, { payload }) => {
      state.favorites = [...state.favorites, payload];
    },
    [addFavorites.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [deleteFavorites.fulfilled]: (state, { payload }) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite._id !== payload._id
      );
    },
    [deleteFavorites.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default favoritesSlice.reducer;
