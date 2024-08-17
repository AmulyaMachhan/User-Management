import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [
    "Product Designer",
    "Product Developer",
    "Frontend Engineer",
    "Backend Engineer",
  ],
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    removeRole: (state, action) => {
      state.roles = state.roles.filter((role) => role !== action.payload);
    },
  },
});

export const { addRole, removeRole } = roleSlice.actions;
export default roleSlice.reducer;
