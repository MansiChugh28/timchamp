import api from './api';

const userService = {
    getAllUsers: (params = {}) => {
        return api.get('/users', { params });
    },

    createUser: (userData) => {
        return api.post('/users', userData);
    },

    updateUser: (id, userData) => {
        return api.put(`/users/${id}`, userData);
    },

    deleteUser: (id) => {
        return api.delete(`/users/${id}`);
    }
};

export default userService;
