import React, { useState, useEffect } from 'react';
import {
    Users,
    Plus,
    Search,
    MoreHorizontal,
    Mail,
    Shield,
    UserCheck,
    Filter,
    Trash2,
    Edit2,
    ChevronRight,
    TrendingUp,
    Layout
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../features/admin/adminSlice';
import Modal from '../../components/ui/Modal';
import UserForm from '../../components/users/UserForm';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';

const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.admin);
    const { user: currentUser } = useSelector((state) => state.auth);

    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleCreateUser = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this identity?')) {
            dispatch(deleteUser(id));
        }
    };

    const handleSubmit = async (formData) => {
        setFormLoading(true);
        try {
            if (editingUser) {
                await dispatch(updateUser({ id: editingUser.id, userData: formData })).unwrap();
            } else {
                await dispatch(createUser(formData)).unwrap();
            }
            setModalOpen(false);
        } catch (err) {
            console.error('Form submission failed:', err);
        } finally {
            setFormLoading(false);
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'ADMIN': return 'bg-purple-50 text-purple-600 border-purple-100';
            case 'MANAGER': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700 max-w-[1400px] mx-auto pb-20">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Identity Registry</h1>
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 leading-none">Access Control System: operational</p>
                    </div>
                </div>
                <Button
                    onClick={handleCreateUser}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest px-8 py-6 shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1"
                >
                    <Plus size={16} className="mr-2" /> Establish Entity
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-5 rounded-[24px] border border-slate-100 shadow-premium">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        placeholder="Search active identities..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[13px] font-medium outline-none transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-2xl border-slate-200 h-[52px] px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Filter size={16} className="mr-2" /> Profile Filter
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-premium overflow-hidden">
                <div className="p-0 overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <tr>
                                <th className="px-10 py-6">Operational Entity</th>
                                <th className="px-10 py-6">Access Protcol</th>
                                <th className="px-10 py-6">Functional Unit</th>
                                <th className="px-10 py-6">Proxy Superior</th>
                                <th className="px-10 py-6">State</th>
                                <th className="px-10 py-6 text-right">Operational Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users?.map?.((u) => (
                                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center font-black text-xs text-slate-500 shadow-sm group-hover:rotate-6 transition-transform">
                                                {u.initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{u.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400">{u.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                            getRoleBadge(u.role)
                                        )}>{u.role}</span>
                                    </td>
                                    <td className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        {u.department} / {u.team}
                                    </td>
                                    <td className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        {u.manager}
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full animate-pulse",
                                                u.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'
                                            )} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{u.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEditUser(u)}
                                                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(u.id)}
                                                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-600 hover:border-red-100 shadow-sm transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Create/Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingUser ? 'Update Identity Vector' : 'Establish New Identity'}
                maxWidth="max-w-4xl"
            >
                <UserForm
                    initialData={editingUser}
                    onSubmit={handleSubmit}
                    onCancel={() => setModalOpen(false)}
                    loading={formLoading}
                />
            </Modal>
        </div>
    );
};

export default UserList;
