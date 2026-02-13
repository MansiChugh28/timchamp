import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
    const location = useLocation();

    if (loading) {
        return <div className="flex h-screen items-center justify-center font-black uppercase text-[10px] tracking-widest text-slate-400">Synchronizing Identity...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
