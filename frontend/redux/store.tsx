import { configureStore } from "@reduxjs/toolkit";
import {blogApi} from '../API/blogApi';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer
  },
  middleware: (getDegaultMiddleware) => 
    getDegaultMiddleware({
      serializableCheck: {
        warnAfter: 100
      }
    }).concat(blogApi.middleware)
})