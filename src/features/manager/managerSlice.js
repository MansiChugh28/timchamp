import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Thunks ---

export const fetchTeamActivity = createAsyncThunk(
    'manager/fetchTeamActivity',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get('/manager/team-activity');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch team activity');
        }
    }
);

export const fetchTeamProjects = createAsyncThunk(
    'manager/fetchTeamProjects',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get('/manager/projects');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch team projects');
        }
    }
);

export const fetchTeamReports = createAsyncThunk(
    'manager/fetchReports',
    async (params, { rejectWithValue }) => {
        try {
            const data = await api.get('/manager/reports', { params });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch reports');
        }
    }
);

const initialState = {
    teamStats: null,
    projects: [],
    reports: [],
    loading: false,
    error: null,
};

const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Team Activity
            .addCase(fetchTeamActivity.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTeamActivity.fulfilled, (state, action) => {
                state.loading = false;
                state.teamStats = action.payload;
            })
            .addCase(fetchTeamActivity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Team Projects
            .addCase(fetchTeamProjects.fulfilled, (state, action) => {
                state.projects = action.payload;
            })
            // Team Reports
            .addCase(fetchTeamReports.fulfilled, (state, action) => {
                state.reports = action.payload;
            });
    },
});

export default managerSlice.reducer;
