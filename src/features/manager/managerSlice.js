import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// --- Thunks ---

export const fetchTeamActivity = createAsyncThunk(
    'manager/fetchTeamActivity',
    async (managerId, { rejectWithValue }) => {
        try {
            const params = managerId ? { manager_id: managerId } : {};
            const data = await api.get('/dashboard/statistics', { params });
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
export const fetchMemberActivity = createAsyncThunk(
    'manager/fetchMemberActivity',
    async ({ memberId, date }, { rejectWithValue }) => {
        try {
            const data = await api.get(`/users/${memberId}/batch_activity`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch member activity');
        }
    }
);

const initialState = {
    teamStats: null,
    projects: [],
    reports: [],
    selectedMember: {
        activity: [],
        screenshots: [],
        metrics: null,
        loading: false,
        error: null,
    },
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
            })
            // Member Activity (Detailed)
            .addCase(fetchMemberActivity.pending, (state) => {
                state.selectedMember.loading = true;
                state.selectedMember.error = null;
            })
            .addCase(fetchMemberActivity.fulfilled, (state, action) => {
                state.selectedMember.loading = false;
                state.selectedMember.activity = action.payload.activity || [];
                state.selectedMember.screenshots = action.payload.screenshots || [];
                state.selectedMember.metrics = action.payload.metrics || null;
            })
            .addCase(fetchMemberActivity.rejected, (state, action) => {
                state.selectedMember.loading = false;
                state.selectedMember.error = action.payload;
            });
    },
});

export default managerSlice.reducer;
