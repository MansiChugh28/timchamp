import { useAuthContext } from '../context/AuthContext';


export const useAuth = () => {
    const { user, token, role, isAuthenticated, loading, login, logout } = useAuthContext();

    return {
        user,
        token,
        role,
        isAuthenticated,
        loading,
        login,
        logout
    };
};
