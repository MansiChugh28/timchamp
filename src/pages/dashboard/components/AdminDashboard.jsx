import React from 'react';
import {
    Users,
    Layout,
    Briefcase,
    Zap,
    BarChart3,
    Clock,
    ArrowUpRight
} from 'lucide-react';
import {
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend,
    PieChart, Pie, Cell
} from 'recharts';
import { cn } from '../../../lib/utils';
import {
    StatCard,
    HubstaffChartCard,
    CustomTooltip,
    analyticsData,
    productivityData,
    getSparkData
} from './DashboardShared';

const AdminDashboard = ({ adminState, navigate }) => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Operational Intel</h1>
                <div className="flex items-center gap-3 mt-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Global Session: Active</p>
                </div>
            </div>
            {/* <div className="flex gap-3">
                <div className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm flex">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Global</button>
                    <button className="px-4 py-2 text-slate-400 hover:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Team</button>
                </div>
                <button className="px-6 py-3 bg-[#0f172a] rounded-2xl text-[10px] font-black text-white shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all hover:-translate-y-1 uppercase tracking-[0.2em]">
                    Export Protocol
                </button>
            </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Active Entities"
                value={adminState.stats?.activeEntities || '1,284'}
                icon={Users}
                colorClass="bg-blue-50 text-blue-600"
                trend={12.5}
                sparklineData={getSparkData(true)}
            />
            <StatCard
                title="Productive Teams"
                value="24"
                icon={Layout}
                colorClass="bg-indigo-50 text-indigo-600"
                trend={4.2}
                sparklineData={getSparkData(true)}
            />
            <StatCard
                title="Active Streams"
                value="156"
                icon={Briefcase}
                colorClass="bg-amber-50 text-amber-600"
                trend={18.1}
                sparklineData={getSparkData(true)}
            />
            <StatCard title="Unit Velocity" value="84%" icon={Zap} colorClass="bg-emerald-50 text-emerald-600" trend={-8.4} sparklineData={getSparkData(false)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 min-w-0">
                <HubstaffChartCard title="Operational Performance" subtitle="Cross-unit activity analysis">
                    <ResponsiveContainer width="99%" height="100%">
                        <AreaChart data={analyticsData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorWorking" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={15} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} tickFormatter={(val) => `${val}h`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '9px', fontWeight: 900 }} />
                            <Area type="monotone" dataKey="working" name="Effort" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWorking)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </HubstaffChartCard>
            </div>

            <HubstaffChartCard title="Top Team Ranks" subtitle="Performance benchmark by department">
                <div className="space-y-4 overflow-y-auto max-h-[280px] mt-4 pr-2">
                    {[
                        { name: 'Engineering', manager: 'Marcus Thorne', productivity: 94, members: 45, id: 1 },
                        { name: 'UI/UX Design', manager: 'Elena Vance', productivity: 92, members: 22, id: 2 },
                        { name: 'Production', manager: 'David Chen', productivity: 88, members: 18, id: 3 },
                        { name: 'Quality Assurance', manager: 'Sarah Miller', productivity: 85, members: 12, id: 4 },
                        { name: 'DevOps', manager: 'Robert Wilson', productivity: 82, members: 8, id: 5 },
                    ].map((team, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-blue-600 text-xs shadow-sm">
                                    #{idx + 1}
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{team.name}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mgr: {team.manager}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-900 leading-none">{team.productivity}%</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{team.members} Members</p>
                            </div>
                        </div>
                    ))}
                </div>
            </HubstaffChartCard>
        </div>


        {/* Organization Squad Registry */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                    <Users size={18} className="text-blue-600" /> Organization Squad Registry
                </h3>
            </div>
            <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-50">
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department</th>
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Team Lead / Manager</th>
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Productivity</th>
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit Health</th>
                            <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {adminState.managers?.map(manager => (
                            <tr key={manager.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-600">
                                            {(manager.functional_unit || manager.department || 'U')[0]}
                                        </div>
                                        <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{manager.functional_unit || manager.department || 'Unassigned'}</span>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <button
                                        onClick={() => navigate(`/dashboard/manager/${manager.id}`)}
                                        className="flex items-center gap-3 hover:text-blue-600 transition-colors text-left"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600">
                                            {manager.name ? manager.name.split(' ').map(n => n[0]).join('') : 'M'}
                                        </div>
                                        <span className="text-xs font-bold">{manager.name}</span>
                                    </button>
                                </td>
                                <td className="p-8">
                                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border italic",
                                        (manager.productivity || 85) > 90 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100')}>
                                        {manager.productivity || Math.floor(Math.random() * 20) + 75}% Aggregate
                                    </span>
                                </td>
                                <td className="p-8">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-1.5 h-1.5 rounded-full",
                                            manager.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500')} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{manager.status || 'Active'}</span>
                                    </div>
                                </td>
                                <td className="p-8 text-right">
                                    <button
                                        onClick={() => navigate(`/dashboard/manager/${manager.id}`)}
                                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        Unit Deep-Dive
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

export default AdminDashboard;
