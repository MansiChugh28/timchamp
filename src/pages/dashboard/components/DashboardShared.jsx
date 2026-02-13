import { cn } from '../../../lib/utils';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export const analyticsData = [
    { name: 'Mon', working: 6.5, idle: 1.2, nonProductive: 0.3 },
    { name: 'Tue', working: 7.2, idle: 0.8, nonProductive: 0.5 },
    { name: 'Wed', working: 6.8, idle: 1.5, nonProductive: 0.2 },
    { name: 'Thu', working: 8.5, idle: 0.5, nonProductive: 0.1 },
    { name: 'Fri', working: 7.9, idle: 1.2, nonProductive: 0.4 },
    { name: 'Sat', working: 3.2, idle: 0.4, nonProductive: 2.1 },
    { name: 'Sun', working: 2.5, idle: 0.2, nonProductive: 1.8 },
];

export const teamData = [
    { name: 'Eng', members: 45, productivity: 88, attendance: 95 },
    { name: 'Des', members: 22, productivity: 92, attendance: 90 },
    { name: 'Mkt', members: 18, productivity: 78, attendance: 85 },
    { name: 'Prd', members: 12, productivity: 95, attendance: 98 },
    { name: 'QA', members: 10, productivity: 82, attendance: 92 },
];

export const productivityData = [
    { name: 'Productive', value: 78, color: '#3b82f6' },
    { name: 'Idle', value: 12, color: '#f59e0b' },
    { name: 'Neutral', value: 10, color: '#94a3b8' },
];

export const CustomTooltip = ({ active, payload, label }) => {
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

export const getSparkData = (up) => Array.from({ length: 10 }, (_, i) => ({
    value: 10 + (up ? i * 2 : 20 - i * 2) + Math.random() * 10
}));

export const StatCard = ({ title, value, icon: Icon, colorClass, trend, sparklineData }) => (
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

export const HubstaffChartCard = ({ title, children, subtitle, action }) => (
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
