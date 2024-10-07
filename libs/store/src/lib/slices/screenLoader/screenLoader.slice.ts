import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loader: false,
  responseLoader: false,
};

const screenLoaderSlice = createSlice({
  name: 'screenLoader',
  initialState,
  reducers: {
    setScreenLoader: (state, action) => {
      state.loader = action.payload;
    },
    setResponseLoader: (state, action) => {
      state.responseLoader = action.payload;
    },
  },
});

export const { setScreenLoader, setResponseLoader } = screenLoaderSlice.actions;
export default screenLoaderSlice.reducer;
