import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ChevronLeft,
    Calendar,
    User,
    Briefcase,
    Paperclip,
    MessageSquare,
    Clock,
    Send,
    MoreHorizontal,
    ChevronRight,
    Shield,
    Zap,
    Tag
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useSelector } from 'react-redux';
import { cn } from '../../lib/utils';

const TaskDetail = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);

    const [taskStatus, setTaskStatus] = useState('In Progress');
    const [commentText, setCommentText] = useState('');

    const isEmployee = user?.role === 'employee';
    const isAdminOrManager = ['admin', 'manager'].includes(user?.role);

    const task = {
        id,
        title: 'Modular UI Component Architecture',
        description: 'Establish a scalable design token system and core visual components for the primary application dashboard. Focus on consistent border radii, premium shadows, and clear layout hierarchy according to the Linear design specs.',
        project: 'APOLLO CMS',
        project_id: '1',
        priority: 'High',
        assignee: 'Alice Smith',
        reporter: 'Ben Wilson',
        deadline: 'Tomorrow, 5:00 PM',
        created_at: 'Feb 10, 2026',
        comments: [
            { id: 1, user: 'Ben Wilson', role: 'MANAGER', time: '2h ago', text: 'Design tokens are updated in the Figma file. Please utilize the new elevation-4 shadow for primary surfaces.' },
            { id: 2, user: 'Alice Smith', role: 'EMPLOYEE', time: '1h ago', text: 'Understood. Implementing the layout grid first, then integrating the Recharts analytics widgets.' },
        ]
    };

    const handleStatusChange = (newStatus) => {
        setTaskStatus(newStatus);
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1400px] mx-auto pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/tasks" className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-premium transition-all hover:-translate-x-1">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className={cn(
                                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border",
                                task.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                            )}>{task.priority} Priority</span>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">UNIT-#{id}</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">{task.title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 pl-5 rounded-[20px] border border-slate-100 shadow-premium">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global State</span>
                    <select
                        value={taskStatus}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-xl py-2 px-6 text-xs font-black uppercase tracking-widest outline-none transition-all cursor-pointer text-slate-700"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-premium">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2 pb-4 border-b border-slate-50">
                            <Zap size={16} className="text-blue-600" /> Executive Description
                        </h3>
                        <p className="text-slate-600 text-lg leading-relaxed font-medium mb-10">{task.description}</p>

                        <div className="pt-10 border-t border-slate-50">
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                                    <Paperclip size={16} className="text-slate-400" />
                                    Operational Attachments (2)
                                </h4>
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Download Archive</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <FileTextIcon />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-black uppercase tracking-tight truncate">Specs_Architecture.pdf</p>
                                        <p className="text-[10px] text-slate-400 font-bold">2.4 MB</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <ImageIcon />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-black uppercase tracking-tight truncate">Dashboard_V3_Final.png</p>
                                        <p className="text-[10px] text-slate-400 font-bold">850 KB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-premium overflow-hidden">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                            <h3 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] flex items-center gap-3">
                                <MessageSquare size={18} className="text-blue-600" />
                                Collaboration Ledger
                            </h3>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{task.comments.length} Entries</span>
                        </div>
                        <div className="p-10 space-y-10">
                            {task.comments.map(comment => (
                                <div key={comment.id} className="flex gap-6 relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 shrink-0 flex items-center justify-center font-black text-xs text-slate-500 shadow-sm">
                                        {comment.user.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{comment.user}</span>
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-[0.2em] border",
                                                    comment.role === 'MANAGER' ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                                )}>{comment.role}</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{comment.time}</span>
                                        </div>
                                        <p className="text-base text-slate-600 leading-relaxed font-medium pr-10">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-8 bg-slate-50/50 border-t border-slate-50">
                            <div className="relative">
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Append data to collaboration ledger..."
                                    className="w-full bg-white border border-slate-200 rounded-3xl py-5 pl-6 pr-20 text-sm font-medium focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all resize-none h-32 shadow-sm placeholder:text-slate-400 focus:shadow-xl"
                                />
                                <button className="absolute bottom-4 right-4 p-4 bg-blue-600 text-white rounded-[20px] shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none">
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-premium">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2 pb-4 border-b border-slate-50">
                            <Shield size={18} className="text-blue-600" /> Unit Metadata
                        </h3>
                        <div className="space-y-8">
                            <DetailItem icon={Briefcase} label="Origin Project" value={task.project} link={`/projects/${task.project_id}`} />
                            <DetailItem icon={User} label="Primary Personnel" value={task.assignee} />
                            <DetailItem icon={User} label="Quality Monitor" value={task.reporter} />
                            <DetailItem icon={Calendar} label="Operational Deadline" value={task.deadline} highlight />
                            <DetailItem icon={Clock} label="Initialized" value={task.created_at} />
                        </div>

                        {isAdminOrManager && (
                            <div className="mt-10 pt-8 border-t border-slate-50">
                                <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-[11px] font-black uppercase tracking-widest py-8 hover:bg-slate-50 transition-all">
                                    Modify Assignment
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="bg-[#0f172a] p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-600/20 rounded-full blur-[64px] group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-4">Operational Pulse</h3>
                            <p className="text-base text-slate-400 leading-relaxed mb-10 font-medium italic opacity-80 shrink-0">"The only way to do great work is to love what you do."</p>
                            <button className="w-full py-5 bg-white/5 hover:bg-white/10 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 group">
                                Operational Protocol <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon: Icon, label, value, link, highlight }) => (
    <div className="flex items-start gap-5">
        <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 shrink-0 border border-slate-100 shadow-sm transition-transform hover:scale-110">
            <Icon size={18} />
        </div>
        <div className="min-w-0">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1.5 leading-none">{label}</p>
            {link ? (
                <Link to={link} className="text-sm font-black text-blue-600 hover:text-blue-700 uppercase tracking-tight block">{value}</Link>
            ) : (
                <p className={cn(
                    "text-sm font-black uppercase tracking-tight",
                    highlight ? 'text-red-500' : 'text-slate-900'
                )}>{value}</p>
            )}
        </div>
    </div>
);

const FileTextIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
);

const ImageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
);

export default TaskDetail;
