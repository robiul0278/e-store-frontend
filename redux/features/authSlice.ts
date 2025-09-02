// store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
}

interface AuthState {
  user: User | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User}>
    ) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;