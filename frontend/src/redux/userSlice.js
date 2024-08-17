import { createSlice } from "@reduxjs/toolkit";
import { generateUsers } from "../utils/fakeData"; // Import your faker function
import { v4 as uuidv4 } from "uuid";

const initialState = {
  users: generateUsers(100), // Initial users generated with Faker
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser: (state, action) => {
      const { id, name, email, role, status, teams } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);

      console.log("Editing User:", { id, name, email, role, status, teams });
      console.log("Index Found:", index);

      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          name,
          email,
          role,
          status,
          teams,
        };

        console.log("User Updated:", state.users[index]);
      } else {
        console.error("User not found:", id);
      }
    },
    addUser: (state, action) => {
      state.users.push({ id: uuidv4(), ...action.payload });
    },
  },
});

export const { deleteUser, editUser, addUser } = userSlice.actions;
export default userSlice.reducer;
