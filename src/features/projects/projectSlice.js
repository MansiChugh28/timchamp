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

export const assignProjectUsers = createAsyncThunk(
    'projects/assignUsers',
    async ({ id, userIds }, { rejectWithValue }) => {
        try {
            const data = await api.post(`/projects/${id}/assign_user`, { user_ids: userIds });
            return { id, data };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Assignment failed');
        }
    }
);

export const unassignProjectUser = createAsyncThunk(
    'projects/unassignUser',
    async ({ id, userId }, { rejectWithValue }) => {
        try {
            await api.delete(`/projects/${id}/unassign_user`, { params: { user_id: userId } });
            return { projectId: id, userId };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Unassignment failed');
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
            })
            // Assign Users (Optimistic Update or Refetch)
            .addCase(assignProjectUsers.fulfilled, (state, action) => {
                // In a real app we might splice the new users into the project
                // For now, we rely on the component re-fetching project list,
                // but we could also update state.currentProject if it matches
            })
            // Unassign User
            .addCase(unassignProjectUser.fulfilled, (state, action) => {
                const { projectId, userId } = action.payload;
                // Update in project list
                const projectIndex = state.projects.findIndex(p => p.id === projectId);
                if (projectIndex !== -1) {
                    const project = state.projects[projectIndex];
                    if (project.members) {
                        // Assuming project.members is a count, decrements
                        // Note: If members is an array, filter it. 
                        // Based on ProjectList, 'members' seems to be a count, but 'assigned_users' might be the array
                        if (Array.isArray(project.assigned_users)) {
                            project.assigned_users = project.assigned_users.filter(u => u.id !== userId);
                        }
                    }
                }
                // Update current project if selected
                if (state.currentProject && state.currentProject.id === projectId) {
                    if (Array.isArray(state.currentProject.assigned_users)) {
                        state.currentProject.assigned_users = state.currentProject.assigned_users.filter(u => u.id !== userId);
                    }
                }
            });
    },
});

export const { clearError } = projectSlice.actions;
export default projectSlice.reducer;
