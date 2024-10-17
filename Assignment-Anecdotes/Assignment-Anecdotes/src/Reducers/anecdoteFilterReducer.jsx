import { createSlice } from "@reduxjs/toolkit";

// Create the filter slice
const anecdoteFilterSlice = createSlice({
  name: 'filter',  // Use quotes for the name
  initialState: "",  // Set initial state here
  reducers: {
    setFilter(state, action) {
      return action.payload;  // Update filter state
    },
    resetFilter() {
      return "";  // Reset filter state to empty
    }
  }
});

// Export actions
export const { setFilter, resetFilter } = anecdoteFilterSlice.actions;

// Export reducer
export default anecdoteFilterSlice.reducer;