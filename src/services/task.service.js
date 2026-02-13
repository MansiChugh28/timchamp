import api from './api';

const taskService = {
    getTasks: () => {
        // return api.get('/tasks');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [
                        { id: '1', title: 'Setup Routing', description: 'Configure React Router', status: 'Completed', assignedTo: 'Alice', priority: 'High', project: 'WorkPulse Frontend' },
                        { id: '2', title: 'Design Layout', description: 'Create sidebar and header', status: 'In Progress', assignedTo: 'Alice', priority: 'Medium', project: 'WorkPulse Frontend' },
                        { id: '3', title: 'API Integration', description: 'Connect services to components', status: 'Pending', assignedTo: 'Ben', priority: 'High', project: 'WorkPulse Frontend' },
                    ],
                });
            }, 500);
        });
    },
    createTask: (taskData) => {
        // return api.post('/tasks', taskData);
        return Promise.resolve({ data: { id: Date.now().toString(), ...taskData } });
    },
    updateStatus: (id, status) => {
        // return api.patch(`/tasks/${id}/status`, { status });
        return Promise.resolve({ data: { id, status } });
    },
};

export default taskService;
