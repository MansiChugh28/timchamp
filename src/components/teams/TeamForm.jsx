import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const TeamForm = ({ onSubmit, onCancel, loading }) => {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name: teamName });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="teamName" className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Team Name
                </Label>
                <Input
                    id="teamName"
                    placeholder="Enter tactical unit name..."
                    className="h-12 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all font-medium"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest h-12 px-6"
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 text-[10px] font-black uppercase tracking-widest h-12 px-8"
                    disabled={loading}
                >
                    {loading ? 'Initializing...' : 'Confirm Initialization'}
                </Button>
            </div>
        </form>
    );
};

export default TeamForm;
