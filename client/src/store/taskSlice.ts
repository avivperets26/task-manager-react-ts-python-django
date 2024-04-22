import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Task, TaskState } from '../types/types';

let INIT = false // Flag to check if CSRF token has been fetched
let csrfToken = '' // CSRF token to be stored here
//const URL = import.meta.env.VITE_SERVER_URL; // URL to be used for API requests
const URL = 'http://localhost:8000'

const initialState: TaskState = { // Initial state for tasks
    tasks: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    currentPage: 1,
    totalTasks: 0
};

export const selectTaskById = (state: RootState, taskId: number) =>
    state.tasks.tasks.find(task => task.id === taskId); // Select task by id

export const fetchCsrfToken = createAsyncThunk('tasks/fetchCsrfToken', async () => { // Async thunk to fetch CSRF token
    if (!INIT) { // Check if CSRF token has been fetched
        const response = await fetch(`${URL}/tasks/get-csrf-token/`, {
            credentials: 'include'  // Make sure credentials are included if cookies need to be sent/received
        });
        const data = await response.json();
        csrfToken = data.csrf_token; // Store the CSRF token
        INIT = true; // Set the flag to true
    }

});
// Async thunk actions

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (page: number = 1) => { // Async thunk to fetch tasks
    const response = await fetch(`${URL}/tasks/?page=${page}`); // Fetch tasks from the server
    return await response.json();
});

export const fetchTask = createAsyncThunk('tasks/fetchTask', async (id: number) => { // Async thunk to fetch a single task
    const response = await fetch(`${URL}/tasks/${id}`); // Fetch a single task from the server
    return await response.json();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number, { dispatch, getState }) => { // Async thunk to delete a task
    const response = await fetch(`${URL}/tasks/${id}/`, { // Ensure the URL is correct and includes the task ID
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        }, credentials: 'include',
    });

    if (!response.ok) { // Check if the response is not OK
        const errorData = await response.text();  // Changed from response.json() to response.text() to avoid issues if the response is not JSON
        console.error('Failed to delete the task, server responded with:', errorData);
        throw new Error('Failed to delete the task. Server responded with status: ' + response.status);
    }

    // After deletion, fetch the current page again
    const currentPage = (getState() as RootState).tasks.currentPage;
    dispatch(fetchTasks(currentPage));

    return id; // return the id to remove it from the state
});


export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => { // Async thunk to update a task
    const response = await fetch(`${URL}/tasks/${task.id}/update/`, { // Ensure the URL is correct and includes the '/update/' if necessary as per your Django URLs
        method: 'PATCH', // Use PATCH as per your backend expectation
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken, // Ensure CSRF token is sent correctly
        },
        credentials: 'include',
        body: JSON.stringify(task),
    });

    if (!response.ok) { // Check if the response is not OK
        const errorData = await response.text();
        throw new Error(`Failed to update task: ${errorData}`);
    }

    return await response.json();
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Task, { dispatch, getState }) => { // Async thunk to create a task

    const response = await fetch(`${URL}/tasks/create/`, { // Ensure the URL is correct and includes the '/create/' if necessary as per your Django URLs
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(task),
    });
    if (!response.ok) { // Check if the response is not OK
        throw new Error(`Failed to create task: ${await response.text()}`);
    }

    // After creation, fetch the current page again
    const currentPage = (getState() as RootState).tasks.currentPage;
    dispatch(fetchTasks(currentPage));
    return await response.json();
});

// More thunks for create, update, delete...

// The slice
export const tasksSlice = createSlice({
    name: 'tasks',  // Name of the slice
    initialState, // Initial state
    reducers: { // Reducers
        setSearchTerm(state, action) { // Set search term   
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => { // Extra reducers
        builder
            .addCase(fetchTasks.pending, (state) => { // Fetch tasks pending
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => { // Fetch tasks fulfilled
                state.status = 'succeeded';
                state.tasks = action.payload.tasks;
                state.totalTasks = action.payload.totalTasks;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchTasks.rejected, (state, action) => { // Fetch tasks rejected
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(deleteTask.pending, (state) => { // Delete task pending
                state.status = 'loading';
            })
            .addCase(deleteTask.fulfilled, (state, action) => { // Delete task fulfilled
                state.tasks = state.tasks.filter(task => task.id !== action.payload);  // Remove the task
                state.status = 'succeeded';
            })
            .addCase(deleteTask.rejected, (state, action) => { // Delete task rejected
                state.status = 'failed';
                state.error = action.error.message || 'Failed to delete task';
            })
            .addCase(updateTask.pending, (state) => { // Update task pending
                state.status = 'loading';
            })
            .addCase(updateTask.fulfilled, (state, action) => { // Update task fulfilled
                const updatedTask = action.payload;
                const index = state.tasks.findIndex(task => task.id === updatedTask.id); // Find the task index
                if (index !== -1) {  // Check if the task exists
                    state.tasks[index] = updatedTask;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {   // Update task rejected
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update task';
            })
            .addCase(createTask.pending, (state) => { // Create task pending
                state.status = 'loading';
            })
            .addCase(createTask.fulfilled, (state, action) => { // Create task fulfilled
                state.tasks.unshift(action.payload); // This should prepend the new task
                state.status = 'succeeded';
            })
            .addCase(createTask.rejected, (state, action) => { // Create task rejected
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create task';
            })
            .addCase(fetchCsrfToken.pending, (state) => { // Fetch CSRF token pending
                state.status = 'loading';
            })
            .addCase(fetchCsrfToken.fulfilled, (state) => { // Fetch CSRF token fulfilled
                state.status = 'succeeded';
            })
            .addCase(fetchCsrfToken.rejected, (state, action) => { // Fetch CSRF token rejected
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch CSRF token';
            });
    },
});

export const { setSearchTerm } = tasksSlice.actions; // Export actions

export const selectTasks = (state: RootState) => state.tasks.tasks; // Select tasks
export const selectTasksStatus = (state: RootState) => state.tasks.status; // Select tasks status

export default tasksSlice.reducer; // Export reducer
