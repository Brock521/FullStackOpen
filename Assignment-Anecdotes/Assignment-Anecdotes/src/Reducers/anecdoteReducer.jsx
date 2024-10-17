import { createSlice } from "@reduxjs/toolkit";

// Initial Anecdote Data
const input = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
];

// Map Input to Initial State
const initialState = input.map((value, index) => ({
  id: index,
  anecdote: value,
  votes: 0,
}));

// Helper Function for Generating IDs
function generateID(state) {
  return state.length; // Return length as the new ID
}

// Anecdote Slice Definition
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    // Increment Vote Reducer
    incrementVote(state, action) {
      const { id } = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) anecdote.votes += 1; // Directly mutating state with Immer
    },

    // Add Anecdote Reducer
    addAnecdote(state, action) {
      const { anecdote } = action.payload;
      if (anecdote.trim() !== "") {
        state.push({ id: generateID(state), anecdote, votes: 0 });
      }
    },
  },
});

// Export Actions and Reducer
export const { incrementVote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
