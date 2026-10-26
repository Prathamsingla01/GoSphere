import { configureStore } from '@reduxjs/toolkit';
import travelReducer from './travelSlice.js';

// Configure the central Redux store
export const store = configureStore({
  reducer: {
    travel: travelReducer,
  },
});

export default store;
