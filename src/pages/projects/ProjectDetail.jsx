import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft,
    Briefcase,
    Calendar,
    CheckSquare,
    Clock,
    Plus,
    Filter,
    Layout,
    Target,
    MoreHorizontal,
    ExternalLink,
    ChevronRight,
    Zap,
    Activity,
    UserCheck
} from 'lucide-react';
import {
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

// --- MOCK DATA ---
const projectActivity = [
    { day: '06 Feb', effort: 32 },
    { day: '07 Feb', effort: 45 },
    { day: '08 Feb', effort: 28 },
    { day: '09 Feb', effort: 52 },
    { day: '10 Feb', effort: 48 },
    { day: '11 Feb', effort: 65 },
    { day: '12 Feb', effort: 58 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f172a] p-3 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-md">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-400">{payload[0].value} Units</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Output</span>
                </div>
            </div>
        );
    }
    return null;
};

const ProjectDetail = () => {
    const { id } = useParams();

    // Mock project data
    const project = {
        id,
        name: 'Apollo CMS Implementation',
        description: 'Architecting a headless content management system for high-velocity retail cycles. Focus on GraphQL integration and edge caching.',
        status: 'Active',
        teams: ['Engineering Hub', 'Strategic Design'],
        deadline: 'Mar 15, 2026',
        progress: 68,
        tasks: [
            { id: 1, title: 'Schema Design & Data Flow', status: 'Completed', assignedTo: 'Alice', priority: 'High', initials: 'AS' },
            { id: 2, title: 'Auth Provider Integration', status: 'Completed', assignedTo: 'Alice', priority: 'Medium', initials: 'AS' },
            { id: 3, title: 'Dashboard Analytics UI', status: 'In Progress', assignedTo: 'Bob', priority: 'High', initials: 'BJ' },
            { id: 4, title: 'Edge Deployment Config', status: 'Pending', assignedTo: 'Charlie', priority: 'High', initials: 'CB' },
        ]
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/projects" className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-premium transition-all hover:-translate-x-1">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={cn(
                                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100"
                            )}>STRATEGIC STREAM / {id}</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">{project.name}</h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-[52px] px-6 text-[10px] font-black uppercase tracking-widest">Protocol Config</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-[52px] px-8 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">Initialize Task</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Project Header Info */}
                    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-premium relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10">
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Unit State</p>
                                <span className="inline-flex px-4 py-1.5 rounded-full text-[10px] font-black text-emerald-500 bg-emerald-50 border border-emerald-100 uppercase tracking-widest">{project.status}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                            <div className="max-w-2xl">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Zap size={16} className="text-blue-600" /> Operational Objectives
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">{project.description}</p>

                                <div className="flex gap-10 pt-8 border-t border-slate-50">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Progression</p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }} />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900">{project.progress}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Exp. Date</p>
                                        <div className="flex items-center gap-2 text-[11px] font-black text-slate-900 uppercase">
                                            <Calendar size={14} className="text-blue-500" />
                                            {project.deadline.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[200px] bg-slate-50/50 rounded-2xl p-6 border border-slate-100/50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Activity Velocity</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">+12% vs LY</span>
                                </div>
                                <ResponsiveContainer width="100%" height="80%">
                                    <AreaChart data={projectActivity}>
                                        <defs>
                                            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="effort"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorActivity)"
                                            animationDuration={2000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Table */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-premium overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest flex items-center gap-3">
                                <CheckSquare size={18} className="text-blue-600" />
                                Operational Backlog ({project.tasks.length})
                            </h3>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full Review</button>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[9px] tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-5 text-left">Unit Objective</th>
                                        <th className="px-8 py-5 text-left">State</th>
                                        <th className="px-8 py-5 text-left">Personnel</th>
                                        <th className="px-8 py-5 text-left">Urgency</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {project.tasks.map(task => (
                                        <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                            <td className="px-8 py-6 font-bold text-slate-900 uppercase tracking-tight text-xs">{task.title}</td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                    task.status === 'Completed' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' :
                                                        task.status === 'In Progress' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                                )}>{task.status}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        {task.initials}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-500">{task.assignedTo}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "text-[9px] font-black tracking-widest uppercase",
                                                    task.priority === 'High' ? 'text-red-500' : 'text-slate-400'
                                                )}>{task.priority}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2 pb-4 border-b border-slate-50 w-full text-left">
                            <Layout size={18} className="text-blue-600" />
                            Allocated Units
                        </h3>
                        <div className="space-y-3">
                            {project.teams.map((team, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-[20px] group transition-all hover:bg-white hover:border-blue-200">
                                    <span className="text-[10px] font-black uppercase text-slate-700">{team}</span>
                                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-6 text-slate-400 border-dashed border-2 rounded-2xl py-8 hover:bg-slate-50 hover:border-slate-200 transition-all text-[10px] font-black uppercase tracking-widest">
                            <Plus size={16} className="mr-1.5" /> Delegate Unit
                        </Button>
                    </div>

                    <div className="bg-[#0f172a] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-8 flex items-center gap-2 pb-4 border-b border-white/5 relative z-10 w-full text-left">
                            <Clock size={16} /> Chrono Data
                        </h3>
                        <div className="space-y-8 relative z-10">
                            <div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <span>Consumption</span>
                                    <span className="text-white">240 / 500H</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" style={{ width: '48%' }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Overtime</p>
                                    <p className="text-sm font-black">12.5H</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
                                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Proj. End</p>
                                    <p className="text-sm font-black text-blue-400">APR 12</p>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                Download Report <ExternalLink size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
