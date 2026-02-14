import React, { useMemo, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    Users,
    Briefcase,
    Mail,
    Phone,
    Calendar,
    Shield,
    Zap,
    TrendingUp,
    MoreHorizontal,
    ChevronRight,
    ExternalLink,
    MessageSquare,
    Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../features/admin/adminSlice';
import { cn } from '../../lib/utils';

const TeamDetail = () => {
    const { id } = useParams(); // encoded unit name
    const location = useLocation();
    const dispatch = useDispatch();
    const unitName = location.state?.unitName || decodeURIComponent(id);

    const { user: currentUser } = useSelector((state) => state.auth);
    const { users, loading } = useSelector((state) => state.admin);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);

    const unitMembers = useMemo(() => {
        return users?.filter(u =>
            (u.functional_unit === unitName || u.department === unitName) &&
            u.organisation_id === currentUser?.organisation_id
        ) || [];
    }, [users, unitName, currentUser?.organisation_id]);

    const manager = useMemo(() => {
        if (!unitMembers.length) return null;

        // Prioritise by role: MANAGER > ADMIN > Others
        return unitMembers.find(u => {
            const r = u.role?.toUpperCase().trim() || '';
            return r === 'MANAGER' || r.includes('MANAGER');
        }) || unitMembers.find(u => {
            const r = u.role?.toUpperCase().trim() || '';
            return r === 'ADMIN' || r.includes('ADMIN');
        }) || unitMembers[0];
    }, [unitMembers]);

    // Mock projects for the unit since they aren't in the user object
    const unitProjects = [
        { id: 1, name: `${unitName} Optimization`, status: 'Active', progress: 65, trend: '+12%' },
        { id: 2, name: 'Unit Resource Scaling', status: 'Active', progress: 40, trend: '+5%' },
    ];

    if (loading && users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deploying Unit Intelligence...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-[1400px] mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/teams" className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-premium transition-all hover:-translate-x-1">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-100">Functional Unit / {unitName}</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">{unitName} Unit</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-[52px] px-8 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                            <Shield size={16} className="mr-2" /> Scale Unit
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                    {/* Members Ledger */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] flex items-center gap-3">
                                <Users size={18} className="text-blue-600" />
                                Operational Personnel ({unitMembers.length})
                            </h3>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full Inventory</button>
                        </div>
                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <tr>
                                        <th className="px-10 py-5">Personnel</th>
                                        <th className="px-10 py-5">Deployment Role</th>
                                        <th className="px-10 py-5 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {unitMembers.map((member) => (
                                        <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        {member.initials || member.name?.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{member.name}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 lowercase">{member.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">{member.role}</td>
                                            <td className="px-10 py-6 text-right">
                                                <Link
                                                    to={`/dashboard/member/${member.id}`}
                                                    className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all inline-block"
                                                >
                                                    <ExternalLink size={16} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Operational Streams */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium relative overflow-hidden">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] flex items-center gap-3">
                                <Briefcase size={18} className="text-blue-600" />
                                Strategic Streams
                            </h3>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Stream Log</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {unitProjects.map(project => (
                                <div key={project.id} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 transition-all group cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight size={20} className="text-blue-600" />
                                    </div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight mb-1">{project.name}</h4>
                                            <span className={cn(
                                                "text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest border",
                                                project.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                                            )}>{project.status}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Velocity</p>
                                            <p className="text-xs font-black text-emerald-500">{project.trend}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <span>Progression</span>
                                            <span className="text-slate-900 font-black">{project.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-white rounded-full overflow-hidden p-0.5 border border-slate-100">
                                            <div className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${project.progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* Leadership Node */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] group-hover:bg-blue-500/10 transition-colors" />
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 pb-4 border-b border-slate-50">Leadership Node</h3>

                        {manager ? (
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-[32px] bg-[#0f172a] flex items-center justify-center text-2xl font-black text-white mb-6 shadow-2xl relative">
                                    <div className="absolute inset-0 bg-blue-600 rounded-[32px] opacity-0 group-hover:opacity-10 transition-opacity" />
                                    {manager.initials || manager.name?.charAt(0)}
                                </div>
                                <h4 className="font-black text-xl text-slate-900 uppercase tracking-tighter">{manager.name}</h4>
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-2 mb-10">{manager.role}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center py-10">
                                <Loader2 className="w-8 h-8 text-slate-200 animate-spin mb-4" />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Synching Lead...</p>
                            </div>
                        )}

                        <div className="w-full space-y-4">
                            <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-black text-slate-600 uppercase tracking-widest hover:bg-white hover:border-blue-100 hover:text-blue-600 transition-all">
                                <div className="flex items-center gap-3">
                                    <Mail size={16} /> Identity Vector
                                </div>
                                <ChevronRight size={14} />
                            </button>
                            <button className="w-full flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs font-black text-slate-600 uppercase tracking-widest hover:bg-white hover:border-blue-100 hover:text-blue-600 transition-all">
                                <div className="flex items-center gap-3">
                                    <MessageSquare size={16} /> Direct Comms
                                </div>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TeamDetail;
