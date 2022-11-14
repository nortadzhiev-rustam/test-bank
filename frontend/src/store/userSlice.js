import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoggedIn: false,
    isLoading: true,
    error: null,
  },
  reducers: {
    login: (state, action) => {
<<<<<<< HEAD
=======
      
      state.isLoggedIn = true;
>>>>>>> 513df6e5b4260c9b2d209e61f9af55a313bf1023
      state.user = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
