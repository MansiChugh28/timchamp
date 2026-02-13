import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
    MessageSquare
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useSelector } from 'react-redux';
import { cn } from '../../lib/utils';

const TeamDetail = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user?.role === 'admin';
    const isManager = user?.role === 'manager';

    // Mock team data
    const team = {
        id,
        name: 'Engineering Hub',
        manager: {
            name: 'Ben Wilson',
            email: 'ben.wilson@workpulse.com',
            avatar: 'BW',
            role: 'STRATEGIC MANAGER'
        },
        members: [
            { id: 1, name: 'Alice Smith', role: 'Frontend Lead', email: 'alice@workpulse.com', status: 'Active', initials: 'AS' },
            { id: 2, name: 'Bob Johnson', role: 'Cloud Architect', email: 'bob@workpulse.com', status: 'Away', initials: 'BJ' },
            { id: 3, name: 'Charlie Brown', role: 'Security Analyst', email: 'charlie@workpulse.com', status: 'Active', initials: 'CB' },
            { id: 4, name: 'Diana Prince', role: 'Backend Dev', email: 'diana@workpulse.com', status: 'In Mission', initials: 'DP' },
        ],
        projects: [
            { id: 1, name: 'Apollo CMS Edge', status: 'Active', progress: 65, trend: '+12%' },
            { id: 2, name: 'Security Protocol V4', status: 'Critical', progress: 30, trend: '-2%' },
        ]
    };

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
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-100">Functional Unit / #{id}</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">{team.name}</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    {(isAdmin || isManager) && (
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
                                Operational Personnel ({team.members.length})
                            </h3>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full Inventory</button>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <tr>
                                        <th className="px-10 py-5">Personnel</th>
                                        <th className="px-10 py-5">Deployment Role</th>
                                        <th className="px-10 py-5">Operational State</th>
                                        <th className="px-10 py-5 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {team.members.map((member) => (
                                        <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        {member.initials}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{member.name}</span>
                                                        <span className="text-[10px] font-bold text-slate-400 lowercase">{member.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-[11px] font-black text-slate-500 uppercase tracking-widest">{member.role}</td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        member.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                                                    )} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{member.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                                                    <ExternalLink size={16} />
                                                </button>
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
                            {team.projects.map(project => (
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
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-[32px] bg-[#0f172a] flex items-center justify-center text-2xl font-black text-white mb-6 shadow-2xl relative">
                                <div className="absolute inset-0 bg-blue-600 rounded-[32px] opacity-0 group-hover:opacity-10 transition-opacity" />
                                {team.manager.avatar}
                            </div>
                            <h4 className="font-black text-xl text-slate-900 uppercase tracking-tighter">{team.manager.name}</h4>
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-2 mb-10">{team.manager.role}</p>

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

                    {/* Stats */}
                    <div className="bg-[#0f172a] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-600/10 rounded-full blur-[64px]" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-10 flex items-center gap-2 pb-4 border-b border-white/5 relative z-10 w-full text-left">
                            <TrendingUp size={16} /> Performance Pulse
                        </h3>
                        <div className="space-y-10 relative z-10">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Unit Efficiency Index</p>
                                <p className="text-4xl font-black tracking-tighter">94.2%</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <Zap size={12} className="text-amber-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">+4.5% Peak</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 text-center">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Cleared</p>
                                    <p className="text-lg font-black text-white underline decoration-blue-500 decoration-2">842</p>
                                </div>
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/10 text-center">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Active</p>
                                    <p className="text-lg font-black text-white underline decoration-indigo-500 decoration-2">12</p>
                                </div>
                            </div>
                            <button className="w-full py-5 bg-white/5 hover:bg-white/10 rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] transition-all border border-white/10 flex items-center justify-center gap-2 group">
                                Operational Audit <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamDetail;
