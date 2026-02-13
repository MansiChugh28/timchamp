import api from './api';

const userService = {
    getAllUsers: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUsers = [
                    { id: 1, name: 'Admin User', email: 'admin@workpulse.com', role: 'ADMIN', status: 'Active', team: 'Management', department: 'Executive', manager: '-', initials: 'AU' },
                    { id: 2, name: 'Ben Wilson', email: 'ben.wilson@workpulse.com', role: 'MANAGER', status: 'Active', team: 'Engineering', department: 'Tech', manager: 'Admin User', initials: 'BW' },
                    { id: 3, name: 'Alice Smith', email: 'alice.smith@workpulse.com', role: 'EMPLOYEE', status: 'Active', team: 'Engineering', department: 'Tech', manager: 'Ben Wilson', initials: 'AS' },
                ];
                resolve({ data: mockUsers });
            }, 500);
        });
    },

    createUser: async (userData) => {
        console.log('Creating user:', userData);
        // return api.post('/users', userData);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { message: 'User created successfully', user: { ...userData, id: Date.now() } } });
            }, 800);
        });
    },

    updateUser: async (id, userData) => {
        console.log('Updating user:', id, userData);
        // return api.put(`/users/${id}`, userData);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { message: 'User updated successfully' } });
            }, 800);
        });
    },

    deleteUser: async (id) => {
        console.log('Deleting user:', id);
        // return api.delete(`/users/${id}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: { message: 'User deleted successfully' } });
            }, 500);
        });
    }
};

export default userService;
