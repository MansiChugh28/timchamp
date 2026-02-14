import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { Activity, Mail, Lock, Loader2, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { login } from '../../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const { login: contextLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(login({ email, password })).unwrap();
            contextLogin(resultAction.user, resultAction.token, resultAction.organization?.name);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[24px] bg-[#0f172a] shadow-2xl mb-6 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Activity className="text-white relative z-10" size={36} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">WorkPulse</h1>
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-[1px] w-4 bg-slate-200" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Enterprise Operations</p>
                        <span className="h-[1px] w-4 bg-slate-200" />
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] shadow-premium border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 flex items-center gap-3 animate-shake">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                {typeof error === 'string' ? error : 'Authentication Failed'}
                            </div>
                        )}

                        <div className="space-y-2.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Identity Vector</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-300 shadow-sm focus:shadow-xl"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Key</label>
                                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-500 transition-colors">Recovery</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent border-2 focus:bg-white focus:border-slate-100 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-slate-300 shadow-sm focus:shadow-xl"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-8 bg-[#0f172a] hover:bg-slate-800 text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 group overflow-hidden relative"
                            disabled={loading}
                        >
                            <div className="absolute inset-0 bg-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-20" />
                            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : (
                                <span className="flex items-center gap-2 justify-center">
                                    Authenticate Profile <Sparkles size={14} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-10 text-center pt-8 border-t border-slate-50">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mb-4">
                            New organisation?
                        </p>
                        <Link to="/register" className="text-[11px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-all underline underline-offset-8 decoration-2 decoration-blue-100 hover:decoration-blue-600">
                            Create Account
                        </Link>
                    </div>
                </div>

                <div className="mt-12 flex justify-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <span className="cursor-pointer hover:text-slate-900 transition-colors">Privacy Protocol</span>
                    <span className="cursor-pointer hover:text-slate-900 transition-colors">Legal Terms</span>
                    <span className="cursor-pointer hover:text-slate-900 transition-colors">Support Node</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
