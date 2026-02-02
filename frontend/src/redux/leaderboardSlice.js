import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfs } from "../api";

export const loadLeaderboard = createAsyncThunk(
  "leaderboard/load",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProfs();
      const professors = Array.isArray(data) ? data : data.professors || [];

      console.log("Leaderboard - Total professors:", professors.length);

      // Log a sample professor to see what data we have
      if (professors.length > 0) {
        console.log("Sample professor data:", {
          name: professors[0].name,
          avgRating: professors[0].avgRating,
          ratingCount: professors[0].ratingCount,
          commentCount: professors[0].commentCount,
        });
      }

      // Calculate leaderboards
      const byAvgRating = [...professors]
        .filter((p) => p.avgRating != null && p.avgRating > 0)
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 10);

      const byTotalRatings = [...professors]
        .filter((p) => (p.ratingCount || 0) > 0)
        .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
        .slice(0, 10);

      const byComments = [...professors]
        .filter((p) => {
          const count = p.commentCount || 0;
          return count > 0;
        })
        .sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))
        .slice(0, 10);

      console.log(
        "Leaderboard - By Avg Rating:",
        byAvgRating.length,
        "professors",
      );
      console.log(
        "Leaderboard - By Total Ratings:",
        byTotalRatings.length,
        "professors",
      );
      console.log(
        "Leaderboard - By Comments:",
        byComments.length,
        "professors",
      );

      // Log the first entry of byComments to debug
      if (byComments.length > 0) {
        console.log("Top commented professor:", {
          name: byComments[0].name,
          commentCount: byComments[0].commentCount,
        });
      } else {
        console.log("No professors with comments found!");
        // Log professors with their comment counts
        const withComments = professors.filter((p) => p.commentCount > 0);
        console.log("Professors with commentCount > 0:", withComments.length);
        if (withComments.length > 0) {
          console.log("First professor with comments:", withComments[0]);
        }
      }

      return {
        byAvgRating,
        byTotalRatings,
        byComments,
      };
    } catch (error) {
      console.error("Leaderboard load error:", error);
      return rejectWithValue(error.message);
    }
  },
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    byAvgRating: [],
    byTotalRatings: [],
    byComments: [],
    loading: false,
    error: null,
    previousByAvgRating: [],
    previousByTotalRatings: [],
    previousByComments: [],
  },
  reducers: {
    updateLeaderboardFromProfessors: (state, action) => {
      const professors = action.payload;

      console.log("Updating leaderboard from professors:", professors.length);

      // Store previous state for animation
      state.previousByAvgRating = state.byAvgRating;
      state.previousByTotalRatings = state.byTotalRatings;
      state.previousByComments = state.byComments;

      // Recalculate
      state.byAvgRating = [...professors]
        .filter((p) => p.avgRating != null && p.avgRating > 0)
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 10);

      state.byTotalRatings = [...professors]
        .filter((p) => (p.ratingCount || 0) > 0)
        .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
        .slice(0, 10);

      state.byComments = [...professors]
        .filter((p) => (p.commentCount || 0) > 0)
        .sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0))
        .slice(0, 10);

      console.log("Updated byComments:", state.byComments.length, "professors");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.byAvgRating = action.payload.byAvgRating;
        state.byTotalRatings = action.payload.byTotalRatings;
        state.byComments = action.payload.byComments;

        console.log(
          "Leaderboard loaded - byComments:",
          state.byComments.length,
        );
      })
      .addCase(loadLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Leaderboard loading failed:", action.payload);
      });
  },
});

export const { updateLeaderboardFromProfessors } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
