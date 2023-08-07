import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import themeSlice from "./themeSlice";
import expenseSlice from "./expenseSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    expense: expenseSlice.reducer,
  },
});

export default store;
