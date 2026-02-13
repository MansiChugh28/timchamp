import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Thunks ---

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get('/users');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch users');
        }
    }
);

export const createUser = createAsyncThunk(
    'admin/createUser',
    async (userData, { rejectWithValue, dispatch }) => {
        try {
            const data = await api.post('/users', userData);
            dispatch(fetchUsers());
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create user');
        }
    }
);

export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ id, userData }, { rejectWithValue, dispatch }) => {
        try {
            const data = await api.put(`/users/${id}`, userData);
            dispatch(fetchUsers());
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update user');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            await api.delete(`/users/${id}`);
            dispatch(fetchUsers());
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete user');
        }
    }
);

export const fetchAdminDashboard = createAsyncThunk(
    'admin/fetchDashboard',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get('/admin/dashboard');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch admin dashboard');
        }
    }
);

const initialState = {
    users: [],
    stats: null,
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Dashboard
            .addCase(fetchAdminDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchAdminDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
