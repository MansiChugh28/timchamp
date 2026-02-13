import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Briefcase,
    Plus,
    Search,
    MoreHorizontal,
    Calendar,
    Layers,
    Users,
    Target,
    ArrowUpRight,
    ChevronRight,
    TrendingUp
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Button } from '../../components/ui/button';
import { useSelector } from 'react-redux';
import EmptyState from '../../components/ui/EmptyState';
import { cn } from '../../lib/utils';

const ProjectList = () => {
    const { user } = useSelector((state) => state.auth);

    // Helper to generate mock sparkline data
    const generateActivity = () => Array.from({ length: 7 }, () => ({ value: Math.floor(Math.random() * 40) + 10 }));

    const [allProjects] = useState([
        { id: 1, name: 'Apollo CMS', description: 'Enterprise headless CMS development for global retail portals.', status: 'Active', members: 12, tasks: 45, deadline: 'Mar 15, 2026', progress: 65, activity: generateActivity(), trend: '+12.4%', team: 'Engineering' },
        { id: 2, name: 'Security Suite V2', description: 'Real-time threat detection and auth interceptor optimization.', status: 'Active', members: 8, tasks: 22, deadline: 'Apr 02, 2026', progress: 32, activity: generateActivity(), trend: '+8.1%', team: 'QA' },
        { id: 3, name: 'Cloud Migration', description: 'Moving legacy infrastructure to decentralized AWS nodes.', status: 'Planning', members: 5, tasks: 12, deadline: 'May 20, 2026', progress: 0, activity: generateActivity(), trend: '0%', team: 'Engineering' },
        { id: 4, name: 'Internal QA Portal', description: 'Automated testing framework for internal deployment pipelines.', status: 'On Hold', members: 4, tasks: 8, deadline: 'Mar 30, 2026', progress: 12, activity: generateActivity(), trend: '-2.5%', team: 'QA' },
    ]);

    // Role-based filtering logic
    const projects = allProjects.filter(project => {
        if (user?.role === 'admin' || user?.role === 'manager') return true;
        // Strict employee filtering: Only show projects clearly assigned to them
        return project.team === user.team;
    });

    const canCreate = user?.role === 'admin' || user?.role === 'manager';

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Planning': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    if (projects.length === 0) {
        return (
            <EmptyState
                icon={Briefcase}
                title="No projects active"
                description="Initialize your first project to start tracking team performance."
                actionLabel={(user?.role === 'admin' || user?.role === 'manager') ? "New Project" : null}
                onAction={(user?.role === 'admin' || user?.role === 'manager') ? () => { } : null}
            />
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto pb-20">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Operational Registry</h1>
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Global Project Synchronization: Active</p>
                    </div>
                </div>
                {canCreate && (
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest px-8 py-6 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                        <Plus size={16} className="mr-2" /> Initialize Stream
                    </Button>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-5 rounded-[24px] border border-slate-100 shadow-premium">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        placeholder="Search operational streams..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[13px] font-medium outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl py-3 px-5 text-[10px] font-black uppercase tracking-widest outline-none transition-all cursor-pointer text-slate-500">
                        <option>Full Distribution</option>
                        <option>Operational</option>
                        <option>Strategic</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map(project => (
                    <Link key={project.id} to={`/projects/${project.id}`} className="group h-full">
                        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-premium group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-500 relative overflow-hidden h-full flex flex-col">

                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 bg-slate-50 text-slate-400 rounded-[20px] group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
                                    <Target size={24} />
                                </div>
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border",
                                    getStatusStyles(project.status)
                                )}>
                                    {project.status}
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                                <p className="text-[13px] font-medium text-slate-400 leading-relaxed mb-8 line-clamp-2">{project.description}</p>

                                <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Activity Trend</p>
                                        <div className="h-10 w-full mb-2">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={project.activity}>
                                                    <Area
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#2563eb"
                                                        strokeWidth={2}
                                                        fillOpacity={0.1}
                                                        fill="#2563eb"
                                                        animationDuration={2000}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase">
                                            <TrendingUp size={12} /> {project.trend}
                                        </div>
                                    </div>
                                    <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Progress</p>
                                        <div className="flex items-end justify-between gap-4">
                                            <span className="text-2xl font-black text-slate-900 leading-none">{project.progress}%</span>
                                            <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mb-1">
                                                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-50 grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Personnel</span>
                                    <p className="text-sm font-black text-slate-900 uppercase">{project.members} Units</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Backlog</span>
                                    <p className="text-sm font-black text-slate-900 uppercase">{project.tasks} Tasks</p>
                                </div>
                                <div className="flex flex-col gap-1 text-right">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Expiration</span>
                                    <p className="text-[10px] font-black text-red-500 uppercase">{project.deadline.split(',')[0]}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-end text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                Observe Workspace <ChevronRight size={14} className="ml-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
