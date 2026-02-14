import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('workpulse_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [organizationName, setOrganizationName] = useState(() => localStorage.getItem('workpulse_org'));
    const [token, setToken] = useState(() => localStorage.getItem('workpulse_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Validation check or re-hydration logic could go here
        setLoading(false);
    }, []);

    const login = (userData, jwtToken, orgName) => {
        setUser(userData);
        setToken(jwtToken);
        setOrganizationName(orgName);
        localStorage.setItem('workpulse_user', JSON.stringify(userData));
        localStorage.setItem('workpulse_token', jwtToken);
        if (orgName) {
            localStorage.setItem('workpulse_org', orgName);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setOrganizationName(null);
        localStorage.removeItem('workpulse_user');
        localStorage.removeItem('workpulse_token');
        localStorage.removeItem('workpulse_org');
    };

    const value = {
        user,
        token,
        organizationName,
        isAuthenticated: !!token,
        role: user?.role || null,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
