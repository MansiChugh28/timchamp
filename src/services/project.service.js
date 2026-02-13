import api from './api';

const projectService = {
    getProjects: () => {
        // return api.get('/projects');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [
                        { id: '1', name: 'WorkPulse Frontend', description: 'Core dashboard development', teams: ['Engineering'], users: ['Alice', 'Ben'], status: 'In Progress' },
                        { id: '2', name: 'Mobile App', description: 'React Native app creation', teams: ['Design', 'Mobile'], users: ['Charlie'], status: 'Pending' },
                    ],
                });
            }, 500);
        });
    },
    createProject: (projectData) => {
        // return api.post('/projects', projectData);
        return Promise.resolve({ data: { id: Date.now().toString(), ...projectData } });
    },
};

export default projectService;
