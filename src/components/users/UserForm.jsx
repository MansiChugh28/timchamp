import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, Building, Users, UserCheck, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const UserForm = ({ initialData, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'EMPLOYEE',
        department: '',
        team: '',
        manager: '',
        status: 'Active',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...formData,
                ...initialData,
                password: '', // Don't pre-fill password for editing
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const roles = [
        { value: 'MANAGER', label: 'Strategic Manager' },
        { value: 'EMPLOYEE', label: 'Unit Personnel' },
    ];

    const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
    const teams = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Core', 'Support'];
    const statuses = ['Active', 'Inactive'];

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Entity Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            name="name"
                            required
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Endpoint Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="name@company.com"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Password - only for create or if specifically requested */}
                {!initialData && (
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Temporary Access Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                name="password"
                                type="password"
                                required={!initialData}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}

                {/* Role */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Protocol</label>
                    <div className="relative group">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <select
                            name="role"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest outline-none transition-all appearance-none cursor-pointer"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Organizational Context */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Functional Unit</label>
                    <div className="relative group">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <select
                            name="department"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[11px] font-bold outline-none transition-all appearance-none cursor-pointer"
                            value={formData.department}
                            onChange={handleChange}
                        >
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tactical Team</label>
                    <div className="relative group">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <select
                            name="team"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[11px] font-bold outline-none transition-all appearance-none cursor-pointer"
                            value={formData.team}
                            onChange={handleChange}
                        >
                            <option value="">Select Team</option>
                            {teams.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                {/* Status */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Operational Status</label>
                    <div className="relative group">
                        <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <select
                            name="status"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[11px] font-bold outline-none transition-all appearance-none cursor-pointer"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Superior Proxy (Manager)</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input
                            name="manager"
                            placeholder="Manager Name"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all"
                            value={formData.manager}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 flex justify-end gap-3">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    className="px-8 h-[52px] rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900"
                >
                    Cancel Protocol
                </Button>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0f172a] hover:bg-slate-800 text-white px-10 h-[52px] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl transition-all hover:-translate-y-1"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : (initialData ? 'Update Entity' : 'Establish Entity')}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;
