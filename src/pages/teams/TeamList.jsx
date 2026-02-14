import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Filter, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import EmptyState from '../../components/ui/EmptyState';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../features/admin/adminSlice';
import { cn } from '../../lib/utils';

const TeamList = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { users, loading } = useSelector((state) => state.admin);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const colors = [
        'bg-blue-600', 'bg-purple-600', 'bg-emerald-600',
        'bg-rose-600', 'bg-amber-600', 'bg-indigo-600'
    ];

    // Grouping logic: Derive units from user data
    const unitsData = useMemo(() => {
        const orgUsers = users?.filter(u => u.organisation_id === user?.organisation_id) || [];
        const groups = {};

        orgUsers.forEach(u => {
            const unitName = u.functional_unit || u.department || 'General Operations';
            if (!groups[unitName]) {
                groups[unitName] = {
                    id: unitName,
                    name: unitName,
                    members: [],
                    manager: null,
                };
            }
            groups[unitName].members.push(u);

            // Heuristic for manager: prioritise someone with MANAGER role
            const role = u.role?.toUpperCase().trim();
            if (role === 'MANAGER') {
                groups[unitName].manager = u.name;
            } else if (role === 'ADMIN' && !groups[unitName].manager) {
                // Secondary fallback: Admin if no manager found yet
                groups[unitName].manager = u.name;
            }
        });

        return Object.values(groups).map((group, index) => ({
            ...group,
            manager: group.manager || group.members[0]?.name || 'Establishing...',
            memberCount: group.members.length,
            projects: Math.floor(Math.random() * 10) + 2, // Mocking projects for now
            performance: `${Math.floor(Math.random() * 20) + 80}%`,
            color: colors[index % colors.length]
        }));
    }, [users, user?.organisation_id]);

    const filteredUnits = unitsData.filter(unit =>
        unit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Users className="w-10 h-10 text-blue-600 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Unit Data...</p>
            </div>
        );
    }

    if (filteredUnits.length === 0) {
        return (
            <div className="space-y-10">
                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Operational Units</h1>
                        <p className="text-slate-500 font-medium ml-0.5">Automated departmental scaling based on Identity Registry</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-5 rounded-3xl border border-slate-100 shadow-premium">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            placeholder="Search departmental registries..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-[52px] rounded-2xl border-slate-100 text-[11px] font-black uppercase tracking-widest px-6">
                        <Filter size={16} className="mr-1.5" /> Filter
                    </Button>
                </div>
                <EmptyState
                    icon={Users}
                    title="No units identified"
                    description="Units are automatically synchronized from your identity registry."
                />
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto pb-20">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Operational Units</h1>
                    <p className="text-slate-500 font-medium ml-0.5">Automated departmental scaling based on Identity Registry</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-5 rounded-3xl border border-slate-100 shadow-premium">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        placeholder="Search departmental registries..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="h-[52px] rounded-2xl border-slate-100 text-[11px] font-black uppercase tracking-widest px-6">
                    <Filter size={16} className="mr-1.5" /> Filter
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredUnits.map(team => (
                    <Link key={team.id} to={`/teams/${encodeURIComponent(team.name)}`} state={{ unitName: team.name }}>
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
                                            <ShieldCheck size={12} className="text-blue-500" /> Unit Lead: {team.manager}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-8 relative z-10">
                                <div className="space-y-1.5">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Personnel</p>
                                    <p className="text-lg font-black text-slate-900">{team.memberCount}</p>
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
                                    {team.members.slice(0, 4).map((m) => (
                                        <div key={m.id} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">
                                            {m.initials || m.name?.charAt(0)}
                                        </div>
                                    ))}
                                    {team.memberCount > 4 && (
                                        <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                            +{team.memberCount - 4}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                                    Audit Unit <ChevronRight size={14} />
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
