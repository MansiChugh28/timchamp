import React, { useState, useEffect } from 'react';
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
    TrendingUp,
    Edit2,
    Trash2,
    Loader2
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Button } from '../../components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../features/projects/projectSlice';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { cn } from '../../lib/utils';

const ProjectList = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { projects, loading, error } = useSelector((state) => state.projects);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    useEffect(() => {
        if (editingProject) {
            setFormData({
                name: editingProject.name,
                description: editingProject.description || ''
            });
        } else {
            setFormData({ name: '', description: '' });
        }
    }, [editingProject]);

    const handleOpenModal = (project = null) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setFormData({ name: '', description: '' });
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingProject) {
                await dispatch(updateProject({ id: editingProject.id, projectData: formData })).unwrap();
                showToast('Project updated successfully.');
            } else {
                await dispatch(createProject(formData)).unwrap();
                showToast('Project initialized successfully.');
            }
            handleCloseModal();
        } catch (err) {
            console.error('Failed to save project:', err);
            showToast(err || 'Failed to save project.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await dispatch(deleteProject(id)).unwrap();
                showToast('Project deleted successfully.');
            } catch (err) {
                console.error('Failed to delete project:', err);
                showToast(err || 'Failed to delete project.', 'error');
            }
        }
    };

    // Helper to generate mock sparkline data (fallback if API doesn't provide activity)
    const generateActivity = () => Array.from({ length: 7 }, () => ({ value: Math.floor(Math.random() * 40) + 10 }));

    const canCreate = user?.role === 'admin' || user?.role === 'manager';

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'Planning': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    if (loading && projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">Loading Operational Registry...</p>
            </div>
        );
    }

    if (projects.length === 0 && !loading) {
        return (
            <>
                <EmptyState
                    icon={Briefcase}
                    title="No projects active"
                    description="Initialize your first project to start tracking team performance."
                    actionLabel={canCreate ? "New Project" : null}
                    onAction={canCreate ? () => handleOpenModal() : null}
                />
                {renderModal()}
            </>
        );
    }

    function renderModal() {
        return (
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProject ? "Update Project" : "Initialize Project"}
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter project name..."
                            required
                            className="rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 transition-all py-6 font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter project description..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 transition-all outline-none text-sm font-medium resize-none"
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                            className="flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest py-6 border-slate-200"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest py-6 shadow-xl shadow-blue-500/20"
                        >
                            {isSubmitting ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                editingProject ? "Update Stream" : "Initialize Stream"
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
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
                    <Button
                        onClick={() => handleOpenModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest px-8 py-6 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        <Plus size={16} className="mr-2" /> Initialize Project
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
                    <div key={project.id} className="group h-full relative">
                        <Link to={`/projects/${project.id}`} className="block h-full">
                            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-premium group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-500 relative overflow-hidden h-full flex flex-col">

                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-4 bg-slate-50 text-slate-400 rounded-[20px] group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6 shadow-sm">
                                        <Target size={24} />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border",
                                            getStatusStyles(project.status || 'Active')
                                        )}>
                                            {project.status || 'Active'}
                                        </div>
                                        {canCreate && (
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleOpenModal(project);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(e, project.id)}
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        )}
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
                                                    <AreaChart data={project.activity || generateActivity()}>
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
                                                <TrendingUp size={12} /> {project.trend || '+0.0%'}
                                            </div>
                                        </div>
                                        <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Progress</p>
                                            <div className="flex items-end justify-between gap-4">
                                                <span className="text-2xl font-black text-slate-900 leading-none">{project.progress || 0}%</span>
                                                <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden mb-1">
                                                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${project.progress || 0}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-50 grid grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Personnel</span>
                                        <p className="text-sm font-black text-slate-900 uppercase">{project.members || 0} Units</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Backlog</span>
                                        <p className="text-sm font-black text-slate-900 uppercase">{project.tasks_count || project.tasks || 0} Tasks</p>
                                    </div>
                                    <div className="flex flex-col gap-1 text-right">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Expiration</span>
                                        <p className="text-[10px] font-black text-red-500 uppercase">{(project.deadline || 'TBD').split(',')[0]}</p>
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center justify-end text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                    Observe Workspace <ChevronRight size={14} className="ml-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {renderModal()}
            {toast && (
                <Toast
                    {...toast}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default ProjectList;
