import React, { useState } from 'react';
import {
    Search,
    Bell,
    Settings,
    LogOut,
    HelpCircle,
    Menu,
    ChevronDown
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-20">
            {/* Search Bar - Modern Linear style */}
            <div className="hidden md:flex items-center w-full max-w-md group">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search projects, tasks, or members (⌘K)"
                        className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-slate-200 border-2 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Support/Help */}
                <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50">
                    <HelpCircle size={20} />
                </button>

                {/* Notifications */}
                <button className="relative p-2.5 text-slate-400 hover:text-slate-900 transition-colors rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-6 w-[1px] bg-slate-100 mx-2"></div>

                {/* User Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-3 p-1.5 pr-3 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center text-xs font-black text-slate-600">
                            {user?.name?.[0].toUpperCase()}
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-tight leading-none mb-0.5">Organization</p>
                            <p className="text-[13px] font-bold text-slate-900 leading-none">{user?.organization}</p>
                        </div>
                        <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-300", showProfile && "rotate-180")} />
                    </button>

                    {showProfile && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowProfile(false)}
                            ></div>
                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-slate-100 shadow-2xl z-20 p-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="p-4 border-b border-slate-50 mb-2">
                                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{user?.email}</p>
                                    <div className="mt-3 inline-flex px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                        {user?.role}
                                    </div>
                                </div>

                                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-2xl transition-colors">
                                    <Settings size={18} />
                                    Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
