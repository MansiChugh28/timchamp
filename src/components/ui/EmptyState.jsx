import React from 'react';
import { Button } from './button';

const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                {Icon && <Icon size={32} />}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 max-w-xs mb-8 leading-relaxed">
                {description}
            </p>
            {actionLabel && (
                <Button
                    onClick={onAction}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold px-8 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
