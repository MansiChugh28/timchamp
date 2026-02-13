import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CheckSquare,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Calendar,
    User,
    Tag,
    Flame,
    Clock,
    ExternalLink,

} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useSelector } from 'react-redux';
import { cn } from '../../lib/utils';
import EmptyState from '../../components/ui/EmptyState';

const TaskList = () => {
    const { user } = useSelector((state) => state.auth);
    const [tasks] = useState([
        { id: 1, title: 'Modular UI Component Architecture', project: 'APOLLO CMS', status: 'In Progress', priority: 'High', assignee: 'Alice Smith', deadline: 'Today', initials: 'AS' },
        { id: 2, title: 'Auth Interceptor & Token Flow', project: 'SECURITY SUITE', status: 'Pending', priority: 'Medium', assignee: 'Alice Smith', deadline: 'Tomorrow', initials: 'AS' },
        { id: 3, title: 'RESTful API Documentation V2', project: 'INTERNAL TOOLS', status: 'Completed', priority: 'Low', assignee: 'Bob Johnson', deadline: 'Feb 12', initials: 'BJ' },
        { id: 4, title: 'Kernel Security Patch #1092', project: 'CORE ENGINE', status: 'In Progress', priority: 'High', assignee: 'Charlie Brown', deadline: 'Feb 15', initials: 'CB' },
        { id: 5, title: 'Strategic Marketing Landing Page', project: 'GROWTH HUB', status: 'Blocked', priority: 'Critical', assignee: 'Diana Prince', deadline: 'Mar 01', initials: 'DP' },
    ]);

    const canCreate = ['ADMIN', 'MANAGER'].includes(user?.role);

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'High': return 'text-red-500 bg-red-50 border-red-100';
            case 'Critical': return 'text-slate-900 bg-slate-900 text-white border-slate-900';
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
            default: return 'text-slate-500 bg-slate-50 border-slate-100';
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'In Progress': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Blocked': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    if (tasks.length === 0) {
        return (
            <EmptyState
                icon={CheckSquare}
                title="No tasks assigned"
                description="Enjoy your cleared schedule or create a new objective to begin."
                actionLabel="Create Task"
                onAction={() => { }}
            />
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Operational Backlog</h1>
                    <p className="text-slate-500 font-medium ml-0.5">Comprehensive audit of unit objectives and sprint milestones</p>
                </div>
                {canCreate && (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest px-8 py-6 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                        <Plus size={16} className="mr-2" /> Dispatch Task
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-5 rounded-3xl border border-slate-100 shadow-premium">
                        <div className="relative flex-1 w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                placeholder="Search tasks by identifier or project..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <Button variant="outline" className="flex-1 md:flex-none h-[52px] rounded-2xl border-slate-100 text-[11px] font-black uppercase tracking-widest px-6 shadow-sm">
                                <Filter size={16} className="mr-2" /> Global Filter
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-premium overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50/50 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                                    <tr>
                                        <th className="px-8 py-6">Unit Objective</th>
                                        <th className="px-8 py-6">State</th>
                                        <th className="px-8 py-6">Urgency</th>
                                        <th className="px-8 py-6">Personnel</th>
                                        <th className="px-8 py-6">Expiration</th>
                                        <th className="px-8 py-6 text-right">Settings</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {tasks.map(task => (
                                        <tr key={task.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                                            <td className="px-8 py-6">
                                                <Link to={`/tasks/${task.id}`} className="block">
                                                    <p className="font-black text-slate-900 uppercase tracking-tight text-sm mb-1 group-hover:text-blue-600 transition-colors">{task.title}</p>
                                                    <p className="text-[10px] font-black tracking-widest text-slate-400">{task.project}</p>
                                                </Link>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border",
                                                    getStatusStyles(task.status)
                                                )}>{task.status}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-fit",
                                                    getPriorityStyles(task.priority)
                                                )}>
                                                    {task.priority === 'Critical' && <Flame size={12} className="animate-pulse" />}
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                        {task.initials}
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-700">{task.assignee}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px]">
                                                    <Clock size={12} />
                                                    {task.deadline}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                    <Link to={`/tasks/${task.id}`} className="p-2.5 bg-white text-slate-400 hover:text-blue-600 rounded-xl border border-slate-100 shadow-sm transition-all hover:scale-105 active:scale-95">
                                                        <ExternalLink size={16} />
                                                    </Link>
                                                    <button className="p-2.5 bg-white text-slate-400 hover:text-slate-900 rounded-xl border border-slate-100 shadow-sm transition-all hover:scale-105 active:scale-95">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-[#0f172a] p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-8 flex items-center gap-2">
                            <CheckSquare size={16} /> Operational Delta
                        </h3>
                        <div className="space-y-8 relative z-10">
                            <div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <span>Milestones Cleared</span>
                                    <span className="text-white">12 / 15</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                                    <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" style={{ width: '80%' }} />
                                </div>
                            </div>
                            <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm text-center">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Weekly Velocity</p>
                                <p className="text-3xl font-black">+24.5%</p>
                            </div>
                            <button className="w-full py-5 bg-blue-600 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all hover:-translate-y-1">
                                Generate Report
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                            <Tag size={16} /> Taxonomy
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                            {['Unit-01', 'Priority-H', 'Strategic', 'Frontend', 'Security', 'Urgent'].map(tag => (
                                <span key={tag} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer transition-all">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-4 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-100 transition-all">
                            Edit Metadata
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
