import React from 'react';
import {
    Clock,
    Zap,
    AlertCircle,
    CheckSquare,
    Layout
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

const EmployeeDashboard = ({ employeeState }) => (
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
            <div className="lg:col-span-2 min-w-0">
                <HubstaffChartCard title="Weekly Activity Pulse" subtitle="Your Working vs Idle vs Non-Productive Hours">
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
                </div>
            </div>
        </div>
    </div>
);

export default EmployeeDashboard;
