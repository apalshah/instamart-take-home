import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees/employeesSlice";

//using store as there are two states that's going to be maintained and used in this app
//1. user state: some of the user info + role of the user (admin, viewer etc)
//2. employees state: all employees relevant pages would need this state for CRUD
export const store = configureStore({
    reducer: {
        employees: employeesReducer
    }
});

// Combine all individual state types into a single RootState type
export interface RootState {
    employees: ReturnType<typeof employeesReducer>;
}

export type AppDispatch = typeof store.dispatch;

