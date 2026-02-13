import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, MoreVertical, Search, Filter, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import EmptyState from '../../components/ui/EmptyState';

import { useSelector } from 'react-redux';
import { cn } from '../../lib/utils';

const TeamList = () => {
    const { user } = useSelector((state) => state.auth);
    const [allTeams] = useState([
        { id: 1, name: 'Engineering', manager: 'Ben Wilson', members: 45, projects: 12, performance: '94%', color: 'bg-blue-600' },
        { id: 2, name: 'Marketing', manager: 'Sarah Lane', members: 18, projects: 4, performance: '82%', color: 'bg-purple-600' },
        { id: 3, name: 'Product', manager: 'Mike Ross', members: 12, projects: 8, performance: '98%', color: 'bg-emerald-600' },
        { id: 4, name: 'Design', manager: 'Jessica Day', members: 22, projects: 5, performance: '91%', color: 'bg-rose-600' },
    ]);

    // Role-based filtering logic
    const teams = allTeams.filter(team => {
        if (user?.role === 'admin') return true;
        if (user?.role === 'manager') return team.manager === user.name;
        // For employees, we'd ideally match by managerId, but here we'll simulate by manager name
        return team.manager === user.managerName || team.name === user.team;
    });

    if (teams.length === 0) {
        return (
            <EmptyState
                icon={Users}
                title="No teams configured"
                description="Structure your organization into units to begin performance analysis."
                actionLabel={(user?.role === 'admin' || user?.role === 'manager') ? "Create Team" : null}
                onAction={(user?.role === 'admin' || user?.role === 'manager') ? () => { } : null}
            />
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Operational Units</h1>
                    <p className="text-slate-500 font-medium ml-0.5">Manage departmental scale and resource allocation</p>
                </div>
                {(user?.role === 'admin' || user?.role === 'manager') && (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest px-8 py-6 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                        <Plus size={16} className="mr-2" /> Initialize Unit
                    </Button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-5 rounded-3xl border border-slate-100 shadow-premium">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        placeholder="Search departmental registries..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
                <Button variant="outline" className="h-[52px] rounded-2xl border-slate-100 text-[11px] font-black uppercase tracking-widest px-6">
                    <Filter size={16} className="mr-1.5" /> Filter
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {teams.map(team => (
                    <Link key={team.id} to={`/teams/${team.id}`}>
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-32 h-32 bg-slate-50 rounded-full blur-2xl group-hover:bg-blue-50 transition-colors duration-500" />

                            <div className="flex justify-between items-start mb-10 relative z-10">
                                <div className="flex gap-4 items-center">
                                    <div className={`w-14 h-14 rounded-2xl ${team.color} flex items-center justify-center text-white shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-500`}>
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{team.name} Unit</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                            <ShieldCheck size={12} className="text-blue-500" /> Lead: {team.manager}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2.5 text-slate-300 hover:text-slate-900 transition-colors">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-8 relative z-10">
                                <div className="space-y-1.5">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Personnel</p>
                                    <p className="text-lg font-black text-slate-900">{team.members}</p>
                                </div>
                                <div className="space-y-1.5 p-0">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Streams</p>
                                    <p className="text-lg font-black text-slate-900">{team.projects}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
                                    <p className="text-lg font-black text-emerald-500 tracking-tighter">{team.performance}</p>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between relative z-10">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                        +32
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                                    Manage Unit <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TeamList;
