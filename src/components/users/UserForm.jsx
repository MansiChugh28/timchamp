import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, Building, Users, UserCheck, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';

const UserForm = ({ initialData, onSubmit, onCancel, loading }) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.admin); // To list managers

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: currentUser?.role === 'manager' ? 'employee' : 'employee',
        functional_unit: '',
        manager_id: currentUser?.role === 'manager' ? currentUser.id : '',
        organisation_id: currentUser?.organisation_id || '',
        is_owner: false,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...formData,
                ...initialData,
                password: '',
            });
        }
    }, [initialData]);

    const managers = users?.filter(u => u.role === 'manager' && u.organisation_id === currentUser?.organisation_id) || [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Force manager_id to null for non-employees, or to creator's ID if creator is manager
        const finalData = { ...formData };
        if (finalData.role !== 'employee') {
            finalData.manager_id = null;
        }
        if (currentUser?.role === 'manager') {
            finalData.role = 'employee';
            finalData.manager_id = currentUser.id;
        }
        onSubmit(finalData);
    };

    const roles = [
        { value: 'admin', label: 'Admin' },
        { value: 'manager', label: 'Manager' },
        { value: 'employee', label: 'Employee' },
    ];

    const functionalUnits = ['Engineer', 'Designer', 'Sales', 'Marketing', 'HR', 'Finance', 'Accountant'];

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
                {currentUser?.role === 'admin' && (
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Protocol</label>
                        <div className="relative group">
                            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <select
                                name="role"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none transition-all appearance-none cursor-pointer"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                {/* Organizational Context */}
                <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Functional Unit</label>
                    <div className="relative group">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <select
                            name="functional_unit"
                            required
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[11px] font-bold outline-none transition-all appearance-none cursor-pointer"
                            value={formData.functional_unit}
                            onChange={handleChange}
                        >
                            <option value="">Select Unit</option>
                            {functionalUnits.map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>

                {/* Manager Dropdown for Employees - only shown if admin is creator */}
                {formData.role === 'employee' && currentUser?.role === 'admin' && (
                    <div className="space-y-2.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Superior Proxy (Manager)</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <select
                                name="manager_id"
                                required={formData.role === 'employee'}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-[11px] font-bold outline-none transition-all appearance-none cursor-pointer"
                                value={formData.manager_id}
                                onChange={handleChange}
                            >
                                <option value="">Select Manager</option>
                                {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                        </div>
                    </div>
                )}

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
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
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
