import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Users,
    Briefcase,
    CheckSquare,
    UserCircle,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Activity
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { cn } from '../../lib/utils';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    console.log("user", user);
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['admin', 'manager', 'employee'] },
        { name: 'Team', icon: Users, path: '/teams', roles: ['admin', 'manager', 'employee'] },
        { name: 'Projects', icon: Briefcase, path: '/projects', roles: ['admin', 'manager', 'employee'] },
        { name: 'Tasks', icon: CheckSquare, path: '/tasks', roles: ['admin', 'manager', 'employee'] },
        { name: 'Users', icon: UserCircle, path: '/users', roles: ['admin'] },
    ];

    const filteredItems = menuItems.filter(item => item.roles.includes(user?.role));

    return (
        <aside className={cn(
            "h-screen bg-[#0f172a] text-white transition-all duration-500 ease-in-out flex flex-col z-30 shadow-2xl overflow-hidden",
            collapsed ? "w-[72px]" : "w-64"
        )}>
            {/* Brand Logo */}
            <div className="p-6 flex items-center h-20 border-b border-slate-800/50">
                <div className="flex items-center gap-3 min-w-[200px]">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                        <Activity size={20} className="text-white" />
                    </div>
                    {!collapsed && (
                        <span className="text-lg font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            WORKPULSE
                        </span>
                    )}
                </div>
            </div>

            {/* Toggle Button - Floating style */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border-2 border-[#0f172a] hover:scale-110 transition-transform z-40"
            >
                {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
                {!collapsed && (
                    <p className="px-4 mb-4 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
                        Main Menu
                    </p>
                )}

                {filteredItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                            isActive
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                        )}
                    >
                        <item.icon size={20} className={cn("shrink-0 transition-transform duration-300 group-hover:scale-110")} />
                        {!collapsed && <span className="font-bold tracking-tight text-sm">{item.name}</span>}

                        {/* Tooltip for collapsed state would be here */}
                    </NavLink>
                ))}
            </nav>

            {/* User Mini Profile */}
            <div className="p-4 border-t border-slate-800/50 bg-slate-900/30">
                <div className={cn(
                    "flex items-center rounded-2xl p-2 transition-all duration-300 hover:bg-slate-800/50",
                    collapsed ? "justify-center" : "gap-3"
                )}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-black shadow-lg">
                        {user?.name?.[0].toUpperCase()}
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold truncate text-white uppercase tracking-tight">{user?.name}</span>
                            <span className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded w-fit mt-0.5",
                                user?.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' :
                                    user?.role === 'MANAGER' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                            )}>
                                {user?.role}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
