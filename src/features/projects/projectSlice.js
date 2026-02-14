import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.get('/projects');
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch projects');
        }
    }
);

export const fetchProjectById = createAsyncThunk(
    'projects/fetchProjectById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await api.get(`/projects/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch project details');
        }
    }
);

export const createProject = createAsyncThunk(
    'projects/createProject',
    async (projectData, { rejectWithValue }) => {
        try {
            // Backend expects { project: { name, description } }
            const data = await api.post('/projects', { project: projectData });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create project');
        }
    }
);

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async ({ id, projectData }, { rejectWithValue }) => {
        try {
            const data = await api.put(`/projects/${id}`, { project: projectData });
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update project');
        }
    }
);

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/projects/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete project');
        }
    }
);

const initialState = {
    projects: [],
    currentProject: null,
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Project By ID
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.currentProject = action.payload;
            })
            // Create Project
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            })
            // Update Project
            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.projects.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
                if (state.currentProject?.id === action.payload.id) {
                    state.currentProject = action.payload;
                }
            })
            // Delete Project
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter(p => p.id !== action.payload);
            });
    },
});

export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;
