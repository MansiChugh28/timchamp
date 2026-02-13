import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { fetchAdminDashboard } from '../../features/admin/adminSlice';
import { fetchTeamActivity, fetchTeamProjects } from '../../features/manager/managerSlice';
import { fetchMyTasks, fetchMyProjects } from '../../features/employee/employeeSlice';

// Sub-Dashboard Components
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

const MOCK_USER = {
    role: "admin" // Standard mock for development
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth(); // Toggle this when backend is ready
    // const user = MOCK_USER;

    // Select state from various slices
    const adminState = useSelector((state) => state.admin);
    const managerState = useSelector((state) => state.manager);
    const employeeState = useSelector((state) => state.employee);

    useEffect(() => {
        if (!user) return;

        if (user.role === 'admin') {
            dispatch(fetchAdminDashboard());
        } else if (user.role === 'manager') {
            dispatch(fetchTeamActivity());
            dispatch(fetchTeamProjects());
        } else {
            dispatch(fetchMyTasks());
            dispatch(fetchMyProjects());
        }
    }, [user.role, dispatch]);

    if (!user) return null;

    // Render appropriate dashboard based on role
    switch (user.role) {
        case 'admin':
            return <AdminDashboard adminState={adminState} navigate={navigate} />;
        case 'manager':
            return <ManagerDashboard managerState={managerState} navigate={navigate} />;
        case 'employee':
            return <EmployeeDashboard employeeState={employeeState} />;
        default:
            return (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <p className="text-slate-400 font-black uppercase tracking-widest">Unauthorized Access</p>
                </div>
            );
    }
};

export default Dashboard;
