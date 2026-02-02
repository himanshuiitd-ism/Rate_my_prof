import { configureStore } from "@reduxjs/toolkit";
import professorsReducer from "./ProfessorSlice.js";
import leaderboardReducer from "./leaderboardSlice.js";

export const store = configureStore({
  reducer: {
    professors: professorsReducer,
    leaderboard: leaderboardReducer,
  },
});
