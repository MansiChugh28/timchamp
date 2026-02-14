import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/admin/adminSlice';
import managerReducer from '../features/manager/managerSlice';
import employeeReducer from '../features/employee/employeeSlice';
import projectReducer from '../features/projects/projectSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        manager: managerReducer,
        employee: employeeReducer,
        projects: projectReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Often useful for complex API responses
        }),
});

export default store;
