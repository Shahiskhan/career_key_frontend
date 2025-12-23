import api from './api';

const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.accessToken) {
            sessionStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
    },

    registerStudent: async (studentData) => {
        const response = await api.post('/auth/register-student', studentData);
        return response.data;
    },

    registerUniversity: async (universityData) => {
        const response = await api.post('/auth/register-university', universityData);
        return response.data;
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
        } finally {
            sessionStorage.removeItem('accessToken');
        }
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    refreshToken: async () => {
        const response = await api.post('/auth/refresh');
        if (response.data.accessToken) {
            sessionStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
    },
};

export default authService;
