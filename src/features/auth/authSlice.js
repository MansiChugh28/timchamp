import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
                    isowner: true
                }
            };

            const data = await api.post('/auth/register', apiPayload);

            // Assuming the API returns { token, user: { ... }, organization: { name, ... } }
            localStorage.setItem('workpulse_token', data.token);
            localStorage.setItem('workpulse_user', JSON.stringify(data.user || data));
            if (data.organization?.name) {
                localStorage.setItem('workpulse_org', data.organization.name);
            }
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
            // Assuming the API returns { token, user: { id, name, role, ... }, organization: { name, ... } }
            localStorage.setItem('workpulse_token', data.token);
            localStorage.setItem('workpulse_user', JSON.stringify(data.user || data));
            if (data.organization?.name) {
                localStorage.setItem('workpulse_org', data.organization.name);
            }
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
        localStorage.removeItem('workpulse_org');
        return true;
    }
);

// --- Slice ---

const savedUser = localStorage.getItem('workpulse_user');
const user = savedUser ? JSON.parse(savedUser) : null;

const initialState = {
    user: user,
    token: localStorage.getItem('workpulse_token'),
    organizationName: localStorage.getItem('workpulse_org'),
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
                state.organizationName = action.payload.organization?.name || null;
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
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user.role;
                state.organizationName = action.payload.organization?.name || null;
                state.isAuthenticated = true;
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

export const { resetError, setUserFromToken } = authSlice.actions;
export default authSlice.reducer;
