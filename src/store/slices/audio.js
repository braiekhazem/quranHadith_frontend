import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getData } from "../../services/protectApi";

const initialState = {
  audio: null,
  currentAyah: null,
  currentWord: null,
};

export const getAudio = createAsyncThunk(
  "audio/getSurah",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios(
        `https://api.qurancdn.com/api/qdc/audio/reciters/7/audio_files?chapter=${params?.surah}&segments=true`,
        params
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

//https://api.qurancdn.com/api/qdc/audio/reciters/5/audio_files?chapter=3&segments=true

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    setAudio(state, { payload }) {
      const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${payload}.mp3`;
      state.audio = audioUrl;
    },
    setAyah(state, { payload }) {
      state.currentAyah = payload;
    },
    setWord(state, { payload }) {
      state.currentWord = payload;
    },
    resetAudio(state) {
      state.audio = null;
    },
  },
  extraReducers: {
    [getAudio.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getAudio.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.audio = payload.audio_files[0];
    },
    [getAudio.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const actionAudio = audioSlice.actions;

export default audioSlice.reducer;
