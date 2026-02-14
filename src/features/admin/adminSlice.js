import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Thunks ---

export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get('/users', { params });
            return response; // Assuming interceptor returns response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch users');
        }
    }
);

export const fetchUserById = createAsyncThunk(
    'admin/fetchUserById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/users/${id}`);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user details');
        }
    }
);

export const createUser = createAsyncThunk(
    'admin/createUser',
    async (userData, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.post('/users', userData);
            dispatch(fetchUsers());
            return response;
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
                // Defensive extraction: handle arrays or wrapped objects
                state.users = Array.isArray(action.payload)
                    ? action.payload
                    : (action.payload?.users || action.payload?.data || []);
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
            })
            // Fetch User By ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                // You might want to store this in state.currentUserDetails if needed
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
