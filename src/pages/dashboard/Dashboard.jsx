import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { fetchAdminDashboard } from '../../features/admin/adminSlice';
import { fetchTeamActivity, fetchTeamProjects } from '../../features/manager/managerSlice';
import { fetchMyTasks, fetchMyProjects } from '../../features/employee/employeeSlice';
import {
    Users,
    Briefcase,
    CheckSquare,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    UserCheck,
    Layout,
    Clock,
    Calendar,
    AlertCircle,
    Zap,
    MousePointer2,
    BarChart3
} from 'lucide-react';
import {
    AreaChart, Area,
    BarChart, Bar,
    LineChart, Line,
    PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend
} from 'recharts';
import { cn } from '../../lib/utils';

// --- MOCK DATA ---
const analyticsData = [
    { name: 'Mon', working: 6.5, idle: 1.2, nonProductive: 0.3 },
    { name: 'Tue', working: 7.2, idle: 0.8, nonProductive: 0.5 },
    { name: 'Wed', working: 6.8, idle: 1.5, nonProductive: 0.2 },
    { name: 'Thu', working: 8.5, idle: 0.5, nonProductive: 0.1 },
    { name: 'Fri', working: 7.9, idle: 1.2, nonProductive: 0.4 },
    { name: 'Sat', working: 3.2, idle: 0.4, nonProductive: 2.1 },
    { name: 'Sun', working: 2.5, idle: 0.2, nonProductive: 1.8 },
];

const teamData = [
    { name: 'Eng', members: 45, productivity: 88, attendance: 95 },
    { name: 'Des', members: 22, productivity: 92, attendance: 90 },
    { name: 'Mkt', members: 18, productivity: 78, attendance: 85 },
    { name: 'Prd', members: 12, productivity: 95, attendance: 98 },
    { name: 'QA', members: 10, productivity: 82, attendance: 92 },
];

const productivityData = [
    { name: 'Productive', value: 78, color: '#3b82f6' },
    { name: 'Idle', value: 12, color: '#f59e0b' },
    { name: 'Neutral', value: 10, color: '#94a3b8' },
];

const growthData = [
    { name: 'Growth', value: 24, color: '#10b981' },
    { name: 'Baseline', value: 76, color: '#f1f5f9' },
];

// --- CUSTOM COMPONENTS FOR CHART ---

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f172a] p-4 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-md">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{label}</p>
                <div className="space-y-1.5">
                    {payload.map((pld, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color || pld.fill }} />
                            <span className="text-xs font-bold text-white uppercase tracking-tight">{pld.name}:</span>
                            <span className="text-xs font-black text-blue-400 ml-auto">{pld.value}{pld.unit || ''}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const StatCard = ({ title, value, icon: Icon, colorClass, trend, sparklineData }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-premium group transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-start mb-4">
            <div className={cn("p-3 rounded-2xl group-hover:rotate-12 transition-all duration-500", colorClass)}>
                <Icon size={20} />
            </div>
            {trend !== undefined && (
                <div className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                    trend > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                )}>
                    {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(trend)}%
                </div>
            )}
        </div>

        <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
            </div>
            <div className="h-10 w-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData}>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={trend > 0 ? '#10b981' : '#ef4444'}
                            strokeWidth={2}
                            fillOpacity={0.1}
                            fill={trend > 0 ? '#10b981' : '#ef4444'}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

const HubstaffChartCard = ({ title, children, subtitle, action }) => (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-premium overflow-hidden">
        <div className="p-8 pb-4 flex justify-between items-center">
            <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">{title}</h3>
                {subtitle && <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-widest">{subtitle}</p>}
            </div>
            {action && (
                <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
                    <MoreHorizontalIcon />
                </button>
            )}
        </div>
        <div className="p-8 pt-0 h-[320px]">
            {children}
        </div>
    </div>
);

const MoreHorizontalIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
);

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    console.log("user", user);

    // Select state from various slices
    const adminState = useSelector((state) => state.admin);
    const managerState = useSelector((state) => state.manager);
    const employeeState = useSelector((state) => state.employee);

    useEffect(() => {
        if (!user) return;

        if (user.role === 'admin') {
            dispatch(fetchAdminDashboard());
        } else if (user.role === 'manager') {
            dispatch(fetchTeamActivity());
            dispatch(fetchTeamProjects());
        } else {
            dispatch(fetchMyTasks());
            dispatch(fetchMyProjects());
        }
    }, [user, dispatch]);

    const getSparkData = (up) => Array.from({ length: 10 }, (_, i) => ({
        value: 10 + (up ? i * 2 : 20 - i * 2) + Math.random() * 10
    }));

    const AdminDashboard = () => (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Operational Intel</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Global Session: Active</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white p-1 rounded-2xl border border-slate-100 shadow-sm flex">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Global</button>
                        <button className="px-4 py-2 text-slate-400 hover:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Team</button>
                    </div>
                    <button className="px-6 py-3 bg-[#0f172a] rounded-2xl text-[10px] font-black text-white shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all hover:-translate-y-1 uppercase tracking-[0.2em]">
                        Export Protocol
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Active Entities"
                    value={user?.role === 'admin' ? adminState.stats?.activeEntities || '1,284' : managerState.teamStats?.activeMembers?.length || '0'}
                    icon={Users}
                    colorClass="bg-blue-50 text-blue-600"
                    trend={12.5}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Active Streams"
                    value={managerState.projects?.length || employeeState.projects?.length || '0'}
                    icon={Briefcase}
                    colorClass="bg-indigo-50 text-indigo-600"
                    trend={4.2}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Unit Velocity"
                    value={user?.role === 'admin' ? '84%' : managerState.teamStats?.productivity || '0%'}
                    icon={Zap}
                    colorClass="bg-amber-50 text-amber-600"
                    trend={18.1}
                    sparklineData={getSparkData(true)}
                />
                <StatCard title="Response Rate" value="0.8s" icon={MousePointer2} colorClass="bg-emerald-50 text-emerald-600" trend={-8.4} sparklineData={getSparkData(false)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <HubstaffChartCard title="Operational Performance" subtitle="Cross-unit activity analysis">
                        <ResponsiveContainer width="100%" height="100%">
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

                <HubstaffChartCard title={user.role === 'admin' ? "Unit Excellence Index" : "Team Productivity Pulse"} subtitle="Operational benchmark vs target">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={teamData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} tickFormatter={(val) => `${val}%`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="productivity" name="Efficiency" unit="%" fill="#0f172a" radius={[12, 12, 4, 4]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </HubstaffChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                    <div className="p-10 border-b border-slate-50 bg-slate-50/30">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                            <BarChart3 size={18} className="text-blue-600" /> Operational Log
                        </h3>
                    </div>
                    <div className="p-0">
                        {(user.role === 'admin' ? adminState.users : (managerState.teamStats?.activityLogs || [])).slice(0, 4).map((act, i) => (
                            <div key={i} className="flex gap-6 items-center p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs text-white shadow-lg shrink-0 group-hover:rotate-6 transition-all",
                                    act.role === 'admin' ? 'bg-blue-600' : act.role === 'manager' ? 'bg-indigo-600' : 'bg-emerald-600')}>
                                    {act.user?.name?.[0] || act.name?.[0] || 'U'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-600">
                                        <span className="font-black text-slate-900 uppercase tracking-tight mr-2">{act.user?.name || act.name}</span> {act.description || 'Performed an action'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">{act.role || 'USER'}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{act.time || 'recent'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium flex flex-col items-center text-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-10 w-full text-left">Strategic Mix</h3>
                    <div className="h-[240px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={productivityData} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" stroke="none">
                                    {productivityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );

    const EmployeeDashboard = () => (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Your Performance Hub</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Live Synchronization: Active</p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-[#0f172a] rounded-2xl text-[10px] font-black text-white shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all hover:-translate-y-1 uppercase tracking-[0.2em]">
                    Export Stats
                </button>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Hours Worked"
                    value="42.5h"
                    icon={Clock}
                    colorClass="bg-blue-50 text-blue-600"
                    trend={5.2}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Productive Hours"
                    value="36.2h"
                    icon={Zap}
                    colorClass="bg-emerald-50 text-emerald-600"
                    trend={12.5}
                    sparklineData={getSparkData(true)}
                />
                <StatCard
                    title="Idle Hours"
                    value="4.8h"
                    icon={AlertCircle}
                    colorClass="bg-amber-50 text-amber-600"
                    trend={-2.1}
                    sparklineData={getSparkData(false)}
                />
                <StatCard
                    title="Tasks Completed"
                    value="18"
                    icon={CheckSquare}
                    colorClass="bg-indigo-50 text-indigo-600"
                    trend={8.4}
                    sparklineData={getSparkData(true)}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Pulse */}
                <div className="lg:col-span-2">
                    <HubstaffChartCard title="Weekly Activity Pulse" subtitle="Your Working vs Idle vs Non-Productive Hours">
                        <ResponsiveContainer width="100%" height="100%">
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
                                <Area type="monotone" dataKey="working" name="Working" unit="h" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWorking)" />
                                <Area type="monotone" dataKey="idle" name="Idle" unit="h" stroke="#f59e0b" strokeWidth={3} fillOpacity={0.1} fill="#f59e0b" />
                                <Area type="monotone" dataKey="nonProductive" name="Non-Productive" unit="h" stroke="#94a3b8" strokeWidth={2} fillOpacity={0.05} fill="#94a3b8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </HubstaffChartCard>
                </div>

                {/* Productivity Pie */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-premium flex flex-col items-center text-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-10 w-full text-left">Productivity Hub</h3>
                    <div className="h-[240px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={productivityData} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" stroke="none">
                                    {productivityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-slate-900 leading-none">88%</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Productive</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full mt-10">
                        {productivityData.map(item => (
                            <div key={item.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                                </div>
                                <p className="text-lg font-black text-slate-900 leading-none">{item.value}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Projects & Tasks */}
                <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                            <Layout size={18} className="text-blue-600" /> Assigned Projects & Tasks
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {(Array.isArray(employeeState.projects) ? employeeState.projects : []).map(project => (
                            <div key={project.id} className="p-6 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{project.name}</h4>
                                        <p className="text-[11px] font-medium text-slate-400">{project.team}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100">
                                        {project.status}
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {(Array.isArray(employeeState.tasks) ? employeeState.tasks : [])
                                        .filter(t => t.project === project.name)
                                        .map(task => (
                                            <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("w-1.5 h-1.5 rounded-full", task.priority === 'High' ? 'bg-red-500' : 'bg-blue-500')} />
                                                    <span className="text-[12px] font-bold text-slate-700">{task.title}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.status}</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Operational Log */}
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                            <Clock size={16} className="text-blue-600" /> Operational Log
                        </h3>
                    </div>
                    <div className="p-0">
                        {(Array.isArray(employeeState.activityLogs) ? employeeState.activityLogs : []).map((log, i) => (
                            <div key={i} className="p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{log.action || 'Task Updated'}</p>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{log.description}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-[8px] font-black uppercase text-blue-500 tracking-[0.2em]">Project: {log.project}</span>
                                </div>
                            </div>
                        ))}
                        {(!employeeState.activityLogs || employeeState.activityLogs.length === 0) && (
                            <div className="p-10 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No recent updates synced</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-[1400px] mx-auto">
            {user?.role === 'employee' ? <EmployeeDashboard /> : <AdminDashboard />}
        </div>
    );
};

export default Dashboard;
