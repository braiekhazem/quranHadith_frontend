import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import quran from "./slices/quran";
import favorites from "./slices/favorites";
import surah from "./slices/surah";
import audio from "./slices/audio";

const store = configureStore({
  reducer: {
    user,
    quran,
    favorites,
    surah,
    audio,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
