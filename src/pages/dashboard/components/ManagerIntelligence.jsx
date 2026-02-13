import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Users,
    Zap,
    Clock,
    ChevronLeft,
    TrendingUp,
    Shield,
    ArrowUpRight,
    Search,
    Filter,
    Mail,
    Phone,
    Activity
} from 'lucide-react';
import {
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { cn } from '../../../lib/utils';
import {
    StatCard,
    HubstaffChartCard,
    CustomTooltip,
    analyticsData,
    getSparkData
} from './DashboardShared';

const ManagerIntelligence = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock intelligence data for the selected manager
    const intelligence = {
        manager: {
            name: id === '1' ? 'Marcus Thorne' : 'Elena Vance',
            role: 'STRATEGIC UNIT LEAD',
            department: id === '1' ? 'Engineering' : 'UI/UX Design',
            avatar: id === '1' ? 'MT' : 'EV',
            status: 'Operational',
            joined: 'June 2023',
            email: 'm.thorne@workpulse.ai'
        },
        stats: {
            capacity: id === '1' ? 45 : 22,
            efficiency: id === '1' ? 94.2 : 91.8,
            velocity: '+12.4%',
            activeStreams: 8
        },
        personnel: [
            { id: 1, name: 'Alex Rivera', role: 'Staff Engineer', prod: 94, status: 'Active', hours: '7.5h', activity: 'High Intensity' },
            { id: 2, name: 'Sarah Chen', role: 'Principle Designer', prod: 88, status: 'Active', hours: '6.2h', activity: 'Focused' },
            { id: 3, name: 'James Wilson', role: 'Systems Architect', prod: 72, status: 'Idle', hours: '4.1h', activity: 'Maintenance' },
            { id: 4, name: 'Elena Petrova', role: 'QA Lead', prod: 91, status: 'Active', hours: '8.0h', activity: 'Automation' },
            { id: 5, name: 'Robert Fox', role: 'DevOps Genie', prod: 83, status: 'Meeting', hours: '5.5h', activity: 'Collaborating' },
        ]
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
            {/* Intel Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 shadow-premium transition-all hover:-translate-x-1"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
                                Management Intelligence / UNIT #{id}
                            </span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">
                            {intelligence.manager.name}
                        </h1>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white p-2 rounded-2xl border border-slate-100 flex items-center gap-6 px-6 shadow-premium">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Control State</span>
                            <span className="text-[11px] font-black text-emerald-600 uppercase tracking-tight flex items-center gap-2">
                                <Activity size={12} /> {intelligence.manager.status}
                            </span>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Department</span>
                            <span className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{intelligence.manager.department}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Squad Capacity"
                    value={intelligence.stats.capacity}
                    icon={Users}
                    colorClass="bg-blue-50 text-blue-600"
                    trend={4.2}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Aggregate Index"
                    value={`${intelligence.stats.efficiency}%`}
                    icon={Zap}
                    colorClass="bg-amber-50 text-amber-600"
                    trend={1.5}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Unit Velocity"
                    value={intelligence.stats.velocity}
                    icon={TrendingUp}
                    colorClass="bg-emerald-50 text-emerald-600"
                    trend={8.4}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Active Streams"
                    value={intelligence.stats.activeStreams}
                    icon={Activity}
                    colorClass="bg-indigo-50 text-indigo-600"
                    trend={-2.4}
                    sparklineData={getSparkData(false)}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Performance Timeline */}
                <div className="lg:col-span-2 space-y-10">
                    <HubstaffChartCard title="Unit Intensity Stream" subtitle="Cross-personnel activity across recent cycles">
                        <ResponsiveContainer width="99%" height="100%">
                            <AreaChart data={analyticsData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIntel" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="working"
                                    name="Intensity"
                                    stroke="#2563eb"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorIntel)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </HubstaffChartCard>
                </div>

                {/* Manager Profile & Insights */}
                <div className="space-y-10">


                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-slate-50">Stream Insights</h3>
                        <div className="space-y-6">
                            {[
                                { label: 'Active Sprints', value: '4' },
                                { label: 'Resource Load', value: '82%' },
                                { label: 'Sync Status', value: 'Prime' },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                                    <span className="text-xs font-black text-slate-900 uppercase">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Personnel Inventory - FULL WIDTH */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <div>
                        <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.3em] flex items-center gap-3">
                            <Users size={18} className="text-blue-600" /> Personnel Operational Ledger
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time unit deployment tracking</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                            <Search size={16} />
                        </button>
                        <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                            <Filter size={16} />
                        </button>
                    </div>
                </div>
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Efficiency</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Time On Mission</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Insight</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {intelligence.personnel.map(person => (
                                <tr key={person.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="p-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white text-xs group-hover:scale-110 transition-transform shadow-lg">
                                                {person.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{person.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{person.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn("h-full rounded-full transition-all duration-1000",
                                                        person.prod > 90 ? 'bg-emerald-500' : person.prod > 80 ? 'bg-blue-500' : 'bg-amber-500'
                                                    )}
                                                    style={{ width: `${person.prod}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-black text-slate-900">{person.prod}%</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-slate-900">{person.hours}</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{person.activity}</span>
                                        </div>
                                    </td>
                                    <td className="p-8">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2 h-2 rounded-full",
                                                person.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' :
                                                    person.status === 'Idle' ? 'bg-amber-500' : 'bg-indigo-500'
                                            )} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{person.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button
                                            onClick={() => navigate(`/dashboard/member/${person.id}`)}
                                            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95"
                                        >
                                            Profile Intel
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

export default ManagerIntelligence;
