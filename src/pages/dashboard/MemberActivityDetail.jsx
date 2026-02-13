import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchMemberActivity
} from '../../features/manager/managerSlice';
import {
    ChevronLeft,
    Calendar,
    MousePointer2,
    Keyboard,
    Clock,
    Image as ImageIcon,
    ExternalLink,
    Activity,
    Zap,
    AlertCircle
} from 'lucide-react';
import {
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { cn } from '../../lib/utils';

const MemberActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedMember } = useSelector(state => state.manager);
    const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (id) {
            dispatch(fetchMemberActivity({ memberId: id, date: selectedDate }));
        }
    }, [id, selectedDate, dispatch]);

    // Mock data for the activity timeline if needed
    const activityTimeline = [
        { time: '09:00', intensity: 45, app: 'VS Code' },
        { time: '10:00', intensity: 85, app: 'VS Code' },
        { time: '11:00', intensity: 92, app: 'Slack' },
        { time: '12:00', intensity: 15, app: 'Chrome' },
        { time: '13:00', intensity: 10, app: 'Idle' },
        { time: '14:00', intensity: 78, app: 'VS Code' },
        { time: '15:00', intensity: 88, app: 'VS Code' },
        { time: '16:00', intensity: 65, app: 'Zoom' },
        { time: '17:00', intensity: 40, app: 'Slack' },
    ];

    const mockScreenshots = [
        { id: 1, time: '10:15 AM', app: 'Visual Studio Code', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, time: '11:30 AM', app: 'Slack - General', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, time: '02:45 PM', app: 'Chrome - Pull Requests', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop' },
        { id: 4, time: '04:10 PM', app: 'Zoom Meeting', url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=2000&auto=format&fit=crop' },
    ];

    if (selectedMember.loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto space-y-10 pb-20">
            {/* Navigation & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 shadow-sm transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Activity Deep-Dive</h1>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                Engineering Squad
                            </span>
                        </div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                            Reviewing: Alex Rivera · {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · Mgr: Marcus Thorne
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white p-2 rounded-2xl border border-slate-100 flex items-center gap-4 px-6 shadow-sm group hover:border-blue-400 transition-all cursor-pointer relative">
                        <Calendar size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-transparent text-[11px] font-black uppercase text-slate-600 tracking-widest outline-none cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Performance Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium flex items-center gap-6">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                        <Zap size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Productivity</p>
                        <h3 className="text-2xl font-black text-slate-900">94.2%</h3>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium flex items-center gap-6">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Time</p>
                        <h3 className="text-2xl font-black text-slate-900">7h 42m</h3>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium flex items-center gap-6">
                    <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Idle Time</p>
                        <h3 className="text-2xl font-black text-slate-900">18m</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Intensity Timeline */}
                <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-premium p-10 min-w-0">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                            <Activity size={18} className="text-blue-600" /> Hourly Intensity Stream
                        </h3>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Working</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="99%" height="100%">
                            <AreaChart data={activityTimeline} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                <Tooltip
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-2xl">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">{label}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-black text-white">{payload[0].value}% Intensity</span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area type="monotone" dataKey="intensity" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorIntensity)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Raw Input Feed */}
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium p-10">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-10">Real-time Telemetry</h3>
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <MousePointer2 size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Cursor Events</p>
                                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">2,842 clicks</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+12% vs avg</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Keyboard size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Keystrokes</p>
                                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">14,302 ops</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+5% vs avg</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 text-slate-600 rounded-xl">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Active Windows</p>
                                    <p className="text-lg font-black text-slate-900 uppercase tracking-tight">12 changes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Screenshot vault */}
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
                        <ImageIcon size={18} className="text-blue-600" /> Screenshot Vault
                    </h3>
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Download All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mockScreenshots.map((shot) => (
                        <div key={shot.id} className="group relative bg-white rounded-[32px] border border-slate-100 shadow-premium overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={shot.url} alt={shot.app} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                    <p className="text-white text-xs font-black uppercase tracking-widest mb-1">{shot.app}</p>
                                    <div className="flex items-center gap-2">
                                        <Clock size={12} className="text-blue-400" />
                                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{shot.time}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Captured</p>
                                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{shot.time}</p>
                                </div>
                                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MemberActivityDetail;
