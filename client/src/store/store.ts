import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';

export const store = configureStore({ // Store configuration
    reducer: { // Reducers
        taskSlice: tasksReducer, // Tasks reducer
    },
});

export type RootState = ReturnType<typeof store.getState>; // Type for root state
export type AppDispatch = typeof store.dispatch; // Type for dispatch function
