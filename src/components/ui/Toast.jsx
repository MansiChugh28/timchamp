import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for exit animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={cn(
            "fixed bottom-8 right-8 z-[100] flex items-center gap-4 px-6 py-4 rounded-[24px] shadow-2xl border transition-all duration-300 transform",
            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95",
            type === 'success'
                ? "bg-emerald-50 border-emerald-100 text-emerald-900"
                : "bg-red-50 border-red-100 text-red-900"
        )}>
            {type === 'success' ? (
                <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-sm shadow-emerald-500/20">
                    <CheckCircle size={20} />
                </div>
            ) : (
                <div className="p-2 bg-red-500 rounded-xl text-white shadow-sm shadow-red-500/20">
                    <XCircle size={20} />
                </div>
            )}

            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                    {type === 'success' ? 'Initialization Successful' : 'Operation Failed'}
                </span>
                <p className="text-[13px] font-bold leading-tight">{message}</p>
            </div>

            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                }}
                className="ml-4 p-2 hover:bg-black/5 rounded-xl transition-colors opacity-40 hover:opacity-100"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
