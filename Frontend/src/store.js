// store.js file

import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slice";

export const store = configureStore({
    reducer: {
        admin : adminReducer
    }
});