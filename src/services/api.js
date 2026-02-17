import axios from 'axios';

let accessToken = null;
let refreshHandler = null;
let refreshPromise = null;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://eddy-sane-senatorially.ngrok-free.dev/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
});

export const setAccessToken = (token) => {
    accessToken = token;
};

// Injection point to avoid circular dependencies
export const setRefreshHandler = (handler) => {
    refreshHandler = handler;
};

api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            // Don't try to refresh if the request itself is for login or register
            const isAuthRequest = originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/register');
            if (isAuthRequest) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (refreshHandler) {
                try {
                    if (!refreshPromise) {
                        refreshPromise = refreshHandler().finally(() => {
                            refreshPromise = null;
                        });
                    }
                    const newToken = await refreshPromise;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error('[API] Global Refresh failed:', refreshError);
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
