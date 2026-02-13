import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Thunks ---

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await api.post('/auth/login', credentials);
            // Assuming the API returns { token, user: { id, name, role, ... } }
            localStorage.setItem('workpulse_token', data.token);
            localStorage.setItem('workpulse_user', JSON.stringify(data.user || data));
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        localStorage.removeItem('workpulse_token');
        localStorage.removeItem('workpulse_user');
        return true;
    }
);

// --- Slice ---

const savedUser = localStorage.getItem('workpulse_user');
const user = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
    user: user,
    token: localStorage.getItem('workpulse_token'),
    role: user?.role || null,
    isAuthenticated: !!localStorage.getItem('workpulse_token'),
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        setUserFromToken: (state, action) => {
            // Useful for re-hydrating user from a saved token or decoding JWT
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.role = action.payload.role;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.role = null;
                state.isAuthenticated = false;
            });
    },
});

export const { resetError, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
