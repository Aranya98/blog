// store.js
import { configureStore } from '@reduxjs/toolkit';
import blogs from './reducer';

export const store = configureStore({
  reducer: {
    blog: blogs,
  },
});
