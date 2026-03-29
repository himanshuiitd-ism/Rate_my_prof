import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfs } from "../api";

export const loadLeaderboard = createAsyncThunk(
  "leaderboard/load",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProfs();
      const professors = Array.isArray(data) ? data : data.professors || [];

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

      return {
        byAvgRating,
        byTotalRatings,
        byComments,
      };
    } catch (error) {
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
      })
      .addCase(loadLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateLeaderboardFromProfessors } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
