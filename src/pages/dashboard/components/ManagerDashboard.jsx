import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Users,
    Zap,
    Clock,
    AlertCircle
} from 'lucide-react';
import {
    AreaChart, Area,
    LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { cn } from '../../../lib/utils';
import { fetchUsers } from '../../../features/admin/adminSlice';
import {
    StatCard,
    HubstaffChartCard,
    CustomTooltip,
    analyticsData,
    getSparkData
} from './DashboardShared';

const ManagerDashboard = ({ managerState, navigate, user }) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.admin);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchUsers({ manager_id: user.id }));
        }
    }, [dispatch, user?.id]);

    // Map fetched users to the table format
    const teamMembers = users.map(u => ({
        id: u.id,
        name: u.name,
        prod: Math.floor(Math.random() * 20) + 75, // Still mocking metrics for now
        idle: `${Math.floor(Math.random() * 60)}m`,
        status: u.status || 'Active',
        role: u.role || 'Personnel'
    }));

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Team Performance Pulse</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Intelligence Stream: Active</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-600 shadow-sm hover:shadow-md transition-all uppercase tracking-[0.2em]">
                        Team Settings
                    </button>
                    <button className="px-6 py-3 bg-[#0f172a] rounded-2xl text-[10px] font-black text-white shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all hover:-translate-y-1 uppercase tracking-[0.2em]">
                        Generate Reports
                    </button>
                </div>
            </div>

            {/* Top Cards for Manager */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Squad"
                    value={teamMembers.length || '0'}
                    icon={Users}
                    colorClass="bg-blue-50 text-blue-600"
                    trend={8.4}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Team Productivity"
                    value={managerState.teamStats?.productivity || '86%'}
                    icon={Zap}
                    colorClass="bg-amber-50 text-amber-600"
                    trend={2.5}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Total Team Hours"
                    value="428h"
                    icon={Clock}
                    colorClass="bg-indigo-50 text-indigo-600"
                    trend={12.1}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Critical Tasks"
                    value="24"
                    icon={AlertCircle}
                    colorClass="bg-red-50 text-red-600"
                    trend={-5.2}
                    sparklineData={getSparkData(false)}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Team Weekly Pulse */}
                <div className="lg:col-span-2 min-w-0">
                    <HubstaffChartCard title="Team Weekly Pulse" subtitle="Aggregate working hours across the squad">
                        <ResponsiveContainer width="99%" height="100%">
                            <AreaChart data={analyticsData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTeam" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="working" name="Team Effort" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTeam)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </HubstaffChartCard>
                </div>

                {/* Individual Performance Breakdown */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Performance Spectrum</h3>
                    <div className="space-y-6 overflow-y-auto max-h-[260px] pr-2">
                        {teamMembers.slice(0, 4).map((m, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-xs uppercase group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {m.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="max-w-[120px]">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight truncate">{m.name}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-slate-900 leading-none">{m.prod}%</p>
                                    <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                        <div className="h-full bg-blue-600" style={{ width: `${m.prod}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HubstaffChartCard title="Project Velocity" subtitle="Task completion rate across primary streams">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={analyticsData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={15} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="working" name="Velocity" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </HubstaffChartCard>

                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium flex flex-col items-center text-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-10 w-full text-left">Task Distribution</h3>
                    <div className="h-[240px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Completed', value: 45, color: '#10b981' },
                                        { name: 'In Progress', value: 35, color: '#3b82f6' },
                                        { name: 'Delayed', value: 20, color: '#ef4444' },
                                    ]}
                                    innerRadius={70}
                                    outerRadius={95}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {[
                                        { name: 'Completed', value: 45, color: '#10b981' },
                                        { name: 'In Progress', value: 35, color: '#3b82f6' },
                                        { name: 'Delayed', value: 20, color: '#ef4444' },
                                    ].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-slate-900 leading-none">82%</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Efficiency</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Member Registry with Deep-Dive Action */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                        <Users size={18} className="text-blue-600" /> Team Member Analytics
                    </h3>
                </div>
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Member</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Productivity</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Idle Time</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {teamMembers.map(member => (
                                <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-600">
                                                {member.name[0]}
                                            </div>
                                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{member.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100 italic">
                                            {member.prod}% Effective
                                        </span>
                                    </td>
                                    <td className="p-8 text-xs font-bold text-slate-400">{member.idle}</td>
                                    <td className="p-8 text-xs font-bold text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-1.5 h-1.5 rounded-full", (member.status === 'Active' || member.status === 'ACTIVE') ? 'bg-emerald-500' : 'bg-amber-500')} />
                                            {member.status}
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button
                                            onClick={() => navigate(`/dashboard/member/${member.id}`)}
                                            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            View Activity
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
