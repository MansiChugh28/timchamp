import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Thunks ---

export const fetchMyTasks = createAsyncThunk(
    'employee/fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get('/employee/tasks');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch tasks');
        }
    }
);

export const fetchMyProjects = createAsyncThunk(
    'employee/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get('/employee/projects');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch projects');
        }
    }
);

export const updateTaskStatus = createAsyncThunk(
    'employee/updateTaskStatus',
    async ({ taskId, status }, { rejectWithValue, dispatch }) => {
        try {
            const data = await api.patch(`/tasks/${taskId}`, { status });
            dispatch(fetchMyTasks());
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update task');
        }
    }
);

const initialState = {
    tasks: [],
    projects: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Tasks
            .addCase(fetchMyTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchMyTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Projects
            .addCase(fetchMyProjects.fulfilled, (state, action) => {
                state.projects = Array.isArray(action.payload) ? action.payload : [];
            });
    },
});

export default employeeSlice.reducer;
