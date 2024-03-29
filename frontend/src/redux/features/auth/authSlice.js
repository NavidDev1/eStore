import { createSlice } from '@reduxjs/toolkit';

// setting up the intial state and getting userInfo if it exists
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredientials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem('expirationTime', expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredientials, logout } = authSlice.actions;

export default authSlice.reducer;
