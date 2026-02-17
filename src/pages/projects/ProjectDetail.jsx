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
    UserCheck,
    Mail
} from 'lucide-react';
import {
    AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectById } from '../../features/projects/projectSlice';
import userService from '../../services/user.service';
import { Loader2 } from 'lucide-react';

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
    const dispatch = useDispatch();
    const { currentProject: project, loading } = useSelector((state) => state.projects);

    React.useEffect(() => {
        dispatch(fetchProjectById(id));
    }, [dispatch, id]);

    if (loading || !project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">Syncing Operational Data...</p>
            </div>
        );
    }

    const assignedEmployees = project.assigned_users || [];

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

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2 pb-4 border-b border-slate-50 w-full text-left">
                            <UserCheck size={18} className="text-blue-600" />
                            Assigned Personnel ({assignedEmployees.length})
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <div className="space-y-3">
                                    {assignedEmployees.map((emp) => (
                                        <div key={emp.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                                                    {emp.initials || emp.name?.charAt(0)}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-black text-slate-900 truncate mb-0.5">{emp.name}</p>
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                        <Mail size={12} />
                                                        <span className="uppercase tracking-wide">{emp.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/dashboard/member/${emp.id}`}
                                                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                                                title="View Activity"
                                            >
                                                <ExternalLink size={16} />
                                            </Link>
                                        </div>
                                    ))}
                                    {assignedEmployees.length === 0 && (
                                        <div className="py-12 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                <UserCheck size={24} />
                                            </div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No personnel allocated to this unit</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
