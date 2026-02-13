import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';

// Auth Pages
import Login from '../pages/auth/Login';

// Dashboard
import Dashboard from '../pages/dashboard/Dashboard';

// Modules
import TeamList from '../pages/teams/TeamList';
import TeamDetail from '../pages/teams/TeamDetail';
import ProjectList from '../pages/projects/ProjectList';
import ProjectDetail from '../pages/projects/ProjectDetail';
import TaskList from '../pages/tasks/TaskList';
import TaskDetail from '../pages/tasks/TaskDetail';
import UserList from '../pages/users/UserList';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />

                {/* Team Routes */}
                <Route path="teams" element={<TeamList />} />
                <Route path="teams/:id" element={<TeamDetail />} />

                {/* Project Routes */}
                <Route path="projects" element={<ProjectList />} />
                <Route path="projects/:id" element={<ProjectDetail />} />

                {/* Task Routes */}
                <Route path="tasks" element={<TaskList />} />
                <Route path="tasks/:id" element={<TaskDetail />} />

                {/* Admin Only Routes */}
                <Route path="users" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <UserList />
                    </ProtectedRoute>
                } />
            </Route>

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};

export default AppRoutes;
