import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout as reduxLogout, setAuth } from '../features/auth/authSlice';
import api, { setAccessToken, setRefreshHandler } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('workpulse_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [organizationName, setOrganizationName] = useState(() => localStorage.getItem('workpulse_org'));
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('workpulse_refresh_token'));
    const [loading, setLoading] = useState(true);

    const refreshToken = useCallback(async () => {
        const rt = localStorage.getItem('workpulse_refresh_token');
        console.log("refreshtokem", rt)
        if (!rt) throw new Error('No refresh token available');

        try {
            const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
                refresh_token: rt
            });
            const { access_token, token } = response.data;
            const newToken = access_token || token;
            setAccessToken(newToken);
            setIsAuthenticated(true);

            // Sync with Redux
            dispatch(setAuth({
                user,
                token: newToken,
                organizationName
            }));

            return newToken;
        } catch (err) {
            console.error('[AuthContext] Token refresh failed');
            throw err;
        }
    }, [dispatch, user, organizationName]);

    useEffect(() => {
        setRefreshHandler(refreshToken);

        const init = async () => {
            const rt = localStorage.getItem('workpulse_refresh_token');
            if (rt) {
                try {
                    await refreshToken();
                } catch (e) {
                    console.warn('[AuthContext] Auto-refresh on mount failed');
                }
            }
            setLoading(false);
        };
        init();
    }, [refreshToken]);

    const login = (userData, accessToken, refreshTokenValue, orgName) => {
        setUser(userData);
        setOrganizationName(orgName);
        setIsAuthenticated(true);
        setAccessToken(accessToken);

        localStorage.setItem('workpulse_user', JSON.stringify(userData));
        localStorage.setItem('workpulse_refresh_token', refreshTokenValue);
        if (orgName) {
            localStorage.setItem('workpulse_org', orgName);
        }

        // Sync with Redux
        dispatch(setAuth({
            user: userData,
            token: accessToken,
            organizationName: orgName
        }));

        try {
            const userEncoded = encodeURIComponent(JSON.stringify(userData));
            const syncUrl = `workpulse://auth?token=${accessToken}&refreshToken=${refreshTokenValue}&user=${userEncoded}`;
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = syncUrl;
            document.body.appendChild(iframe);
            setTimeout(() => document.body.removeChild(iframe), 3000);
        } catch (e) {
            console.error('[Sync] Failed to trigger Desktop Agent sync');
        }
    };

    const logout = () => {
        setUser(null);
        setOrganizationName(null);
        setIsAuthenticated(false);
        setAccessToken(null);

        localStorage.removeItem('workpulse_user');
        localStorage.removeItem('workpulse_refresh_token');
        localStorage.removeItem('workpulse_org');

        dispatch(reduxLogout());
    };

    const value = {
        user,
        organizationName,
        isAuthenticated,
        role: user?.role || null,
        login,
        logout,
        refreshToken,
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
