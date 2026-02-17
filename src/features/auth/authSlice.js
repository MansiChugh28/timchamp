import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Thunks ---

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const apiPayload = {
                organization_name: credentials.organisationName,
                user: {
                    name: credentials.adminName,
                    email: credentials.email,
                    password: credentials.password,
                    role: 'admin',
                    is_owner: true
                }
            };

            const data = await api.post('/auth/register', apiPayload);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await api.post('/auth/login', credentials);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        return true;
    }
);


const initialState = {
    user: null,
    token: null,
    organizationName: null,
    role: null,
    isAuthenticated: false,
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
        setAuth: (state, action) => {
            const { user, role, token, organizationName } = action.payload;
            state.user = user;
            state.role = role || user?.role;
            state.token = token;
            state.organizationName = organizationName;
            state.isAuthenticated = !!user;
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
                const payload = action.payload;
                state.loading = false;
                state.isAuthenticated = true;
                state.user = payload.user || payload;
                state.role = payload.user?.role || payload.role || null;
                state.token = payload.access_token || payload.accessToken || payload.token;
                state.organizationName = payload.organization_name || payload.organization?.name || null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                const payload = action.payload;
                state.loading = false;
                state.isAuthenticated = true;
                state.user = payload.user || payload;
                state.role = payload.user?.role || payload.role || null;
                state.token = payload.access_token || payload.accessToken || payload.token;
                state.organizationName = payload.organization_name || payload.organization?.name || null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.role = null;
                state.organizationName = null;
                state.isAuthenticated = false;
            });
    },
});

export const { resetError, setAuth } = authSlice.actions;
export default authSlice.reducer;
