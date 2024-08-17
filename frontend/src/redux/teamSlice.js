import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teams: ["Development", "Design", "Marketing", "Support"], // Example teams, adjust as needed
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeam: (state, action) => {
      state.teams.push(action.payload);
    },
    removeTeam: (state, action) => {
      state.teams = state.teams.filter((team) => team !== action.payload);
    },
  },
});

export const { addTeam, removeTeam } = teamSlice.actions;
export default teamSlice.reducer;
