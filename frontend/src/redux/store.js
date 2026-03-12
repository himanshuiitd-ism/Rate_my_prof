import { configureStore } from "@reduxjs/toolkit";
import professorsReducer from "./ProfessorSlice.js";
import leaderboardReducer from "./leaderboardSlice.js";

// Persist state to localStorage
const saveState = (state) => {
  try {
    const serialized = JSON.stringify({
      professors: {
        list: state.professors.list,
        listLoaded: state.professors.listLoaded,
      },
      collegeContext: {
        collegeId: localStorage.getItem("selectedCollegeId"),
        collegeName: localStorage.getItem("selectedCollegeName"),
      },
    });
    localStorage.setItem("reduxState", serialized);
  } catch (e) {
    console.error("Failed to save state:", e);
  }
};

const loadState = () => {
  try {
    const serialized = localStorage.getItem("reduxState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    console.error("Failed to load state:", e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    professors: professorsReducer,
    leaderboard: leaderboardReducer,
  },
});

// Subscribe to store updates and persist state
store.subscribe(() => {
  saveState(store.getState());
});
