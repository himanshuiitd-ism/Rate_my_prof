import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfs, fetchProf, submitRating } from "../api";

// Async thunks
export const loadProfessors = createAsyncThunk(
  "professors/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchProfs();
      return Array.isArray(data) ? data : data.professors || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadProfessor = createAsyncThunk(
  "professors/loadOne",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchProf(id);
      // Return both professor and messages
      return {
        professor: data.prof || data,
        messages: data.messages || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const submitProfessorRating = createAsyncThunk(
  "professors/submitRating",
  async ({ id, rating }, { rejectWithValue }) => {
    try {
      await submitRating(id, { categories: { score: rating }, comment: "" });
      // Fetch updated professor data
      const data = await fetchProf(id);
      return {
        professor: data.prof || data,
        messages: data.messages || [],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const professorsSlice = createSlice({
  name: "professors",
  initialState: {
    list: [],
    currentProfessor: null,
    currentMessages: [],
    loading: false,
    professorLoading: false, // New: separate loading state for individual professor
    submittingRating: false,
    error: null,
    scrollPosition: 0,
    listLoaded: false,
  },
  reducers: {
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    clearCurrentProfessor: (state) => {
      state.currentProfessor = null;
      state.currentMessages = [];
      state.professorLoading = true; // Set loading when clearing
    },
    updateProfessorOptimistically: (state, action) => {
      const { id, avgRating, ratingCount } = action.payload;

      // Update in list
      const profIndex = state.list.findIndex((p) => p._id === id);
      if (profIndex !== -1) {
        state.list[profIndex].avgRating = avgRating;
        state.list[profIndex].ratingCount = ratingCount;
      }

      // Update current professor
      if (state.currentProfessor?._id === id) {
        state.currentProfessor.avgRating = avgRating;
        state.currentProfessor.ratingCount = ratingCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Load all professors
      .addCase(loadProfessors.pending, (state) => {
        if (!state.listLoaded) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(loadProfessors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.listLoaded = true;
      })
      .addCase(loadProfessors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Load single professor
      .addCase(loadProfessor.pending, (state) => {
        state.professorLoading = true;
        state.error = null;
      })
      .addCase(loadProfessor.fulfilled, (state, action) => {
        state.professorLoading = false;
        state.currentProfessor = action.payload.professor;
        state.currentMessages = action.payload.messages;

        // Also update in list if present
        const index = state.list.findIndex(
          (p) => p._id === action.payload.professor._id,
        );
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload.professor,
          };
        }
      })
      .addCase(loadProfessor.rejected, (state, action) => {
        state.professorLoading = false;
        state.error = action.payload;
      })

      // Submit rating
      .addCase(submitProfessorRating.pending, (state) => {
        state.submittingRating = true;
        state.error = null;
      })
      .addCase(submitProfessorRating.fulfilled, (state, action) => {
        state.submittingRating = false;
        state.currentProfessor = action.payload.professor;
        state.currentMessages = action.payload.messages;

        // Update in list
        const index = state.list.findIndex(
          (p) => p._id === action.payload.professor._id,
        );
        if (index !== -1) {
          state.list[index] = {
            ...state.list[index],
            ...action.payload.professor,
          };
        }
      })
      .addCase(submitProfessorRating.rejected, (state, action) => {
        state.submittingRating = false;
        state.error = action.payload;
      });
  },
});

export const {
  setScrollPosition,
  clearCurrentProfessor,
  updateProfessorOptimistically,
} = professorsSlice.actions;

export default professorsSlice.reducer;
