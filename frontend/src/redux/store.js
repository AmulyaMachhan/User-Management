import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import roleReducer from "./roleSlice";
import teamReducer from "./teamSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    team: teamReducer,
  },
});

export default store;
